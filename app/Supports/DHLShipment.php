<?php

namespace App\Supports;

use DateTime;
use DateTimeZone;
use App\Library\Order;
use GuzzleHttp\Client;
use App\Library\Activity;
use App\Library\Tracking;
use App\Contracts\Shipment;
use App\Models\Prescription;
use App\Models\ClientShipping;
use App\Services\OrderService;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\DeliveryException;
use App\Models\Country;
use Illuminate\Support\Facades\Storage;

class DHLShipment implements Shipment
{
    private array $clientSettings = [];
    private array $deliverySettings = [];
    private $order;
    private $order_id;
    private $orderdetail;

    private $products;
    private $regions = ['1' => 'AF', '2' => 'AM', '3' => 'AM', '4' => 'AN', '5' => 'AP', '6' => 'EU', '7' => 'AU'];
    private $response;

    private array $vars = [];

    public function __construct()
    {
        $this->order = new Order();
    }
    public function ship(int $id)
    {
        $this->order_id = $id;
        try {
            return $this->validate($id)
                ->getData()
                ->callAPI()
                ->saveResponse();
        } catch (DeliveryException $e) {
            return sendError($e->getMessage(), '', 400);
        }
    }

    private function validate(int $id)
    {
        $this->orderdetail = $this->order->getOrderDetails($id);

        if (!$this->orderdetail) {
            throw new DeliveryException("Order with ID $id not found", 404);
        }

        if ($settings = ClientShipping::where('client_id', $this->orderdetail->ClientID)->first()) {
            $this->clientSettings = $settings->content['dhl'];
        }

        if ($settings = $this->order->getDeliveryCompanySettings('dhl')) {
            $this->deliverySettings = $settings;
        } else {
            throw new DeliveryException('API configuration error', 400);
        }

        if (!(new OrderService)->canUpdateOrderStatus($id, 8)) {
            throw new DeliveryException('You are not allow to update order status', 401);
        }

        return $this;
    }

    private function getData()
    {
        $value = explode(' ', $this->orderdetail->Repeats);

        $this->products = $this->order->getAttachedProducts($this->order_id);

        if (count($this->products) < 1) {
            throw new DeliveryException('Product not found for order', 400);
        }

        $productValue = 0;
        if (isset($value[1]) && is_numeric($value[1])) {
            $productValue = $value[1];
        }
        //calculate value for a single item, round to 3 decimals
        $singleItemValue = 0;
        if ($productValue > 0) {
            $singleItemValue = round((float)$productValue / count($this->products), 3);
        }

        $itemValues = [];
        foreach ($this->products as $product) {
            array_push($itemValues, $singleItemValue);
        }

        //take the remainder and add it to first product
        if ((float)($singleItemValue * count($this->products)) != (float)$productValue) {
            $remainder = (float)$productValue - $singleItemValue * count($this->products);
            $itemValues[0] = $itemValues[0] + $remainder;
        }

        $shipper_country = Country::find($this->clientSettings['shipper_country_id']);

        $this->vars = array_merge($this->clientSettings, $this->deliverySettings);
        $this->vars['CountryCodeName'] = $shipper_country->CodeName2;
        $this->vars['CountryName'] = $shipper_country->Name;

        $this->vars['value'] = $value;
        $this->vars['itemValues'] = $itemValues;

        $reference = $this->orderdetail->PrescriptionID . '-' . $this->orderdetail->ReferenceNumber;
        $charactersToAdd = 32 - strlen($reference);
        $this->vars['reference'] = str_repeat('_', $charactersToAdd) . $reference;
        $date = new DateTime('now');
        $timezone = new DateTimeZone(config('app.timezone'));
        $this->vars['date'] = $date->setTimezone($timezone)->format('c');

        //get shipper data
        $shipper = $this->order->getClientData($this->orderdetail->ClientID);

        if (!empty($shipper->Telephone)) {
            $phone = $shipper->Telephone;
        } elseif (!empty($shipper->Mobile)) {
            $phone = $shipper->Mobile;
        } else if (!empty($this->orderdetail->Telephone)) {
            $phone = $this->orderdetail->Telephone;
        } else {
            $phone = $this->orderdetail->Mobile;
        }
        $this->vars['phone'] = $phone;

        $this->vars['regionCode'] = $this->regions[$shipper->RegionID];
        $this->vars['shipper'] = collect($shipper)->toArray();

        // double check if UK will use U/U
        if ($this->orderdetail->DCountryCode == 1) {
            $isDutiable = 'N';
            $globalProductCode = 'P';
            $localProductCode = 'P';
        } else if ($this->orderdetail->DCountryCode == $this->clientSettings['shipper_country_id']) {
            $isDutiable = 'N';
            $globalProductCode = 'N';
            $localProductCode = 'N';
        } else {
            $isDutiable = 'N';
            $globalProductCode = 'U';
            $localProductCode = 'U';
        }
        $this->vars['isDutiable'] = $isDutiable;
        $this->vars['globalProductCode'] = $globalProductCode;
        $this->vars['localProductCode'] = $localProductCode;

        $this->vars['signature'] = base64_encode(file_get_contents("images/dhl_signature.png"));

        return $this;
    }

    private function callAPI()
    {
        $xmlPath = '/xml/dhl/shipment_validation_10_new';

        $order = $this->orderdetail;
        $vars = $this->vars;
        $products = $this->products;
        $body = view($xmlPath)->with(compact('order', 'vars', 'products'))->render(); //render to XML

        if (App::environment(['local'])) {
            $endpoint = 'https://xmlpitest-ea.dhl.com';
        } else {
            $endpoint = $this->vars['endpoint'];
        }
        $options = [
            'base_uri' => $endpoint,
            'headers' => [
                'Content-Type' => 'text/xml; charset=UTF8',
            ],
            'body' => '<?xml version="1.0" encoding="UTF-8"?>' . $body
        ];

        if (isAzureStorageEnabled()) {
            Storage::disk('azure')->put('dhl_xml/validation-request-' . $this->order_id . '.xml', $body);
        } else {
            Storage::put('dhl_xml/validation-request-' . $this->order_id . '.xml', $body);
        }

        $url = '/XMLShippingServlet';
        $client = new Client($options);

        $this->response = $client->request('POST', $url, $options)->getBody()->getContents();
        return $this;
    }

    private function saveResponse()
    {
        $activityLib = new Activity();
        $trackingLib = new Tracking();

        $xml = simplexml_load_string(utf8_encode($this->response));

        if (isAzureStorageEnabled()) {
            Storage::disk('azure')->put('dhl_xml/validation-response-' . $this->order_id . '.xml', $xml->asXML());
            Storage::disk('azure')->put('dhl_labels/' . $this->order_id . '.zpl', base64_decode($xml->LabelImage->OutputImage));
        } else {
            Storage::put('dhl_xml/validation-response-' . $this->order_id . '.xml', $xml->asXML());
            Storage::put('dhl_labels/' . $this->order_id . '.zpl', base64_decode($xml->LabelImage->OutputImage));
        }

        if (isset($xml->Response->Status) && $xml->Response->Status->ActionStatus == 'Error') {
            Prescription::where('PrescriptionID', $this->order_id)
                ->update(['Message' => $xml->Response->Status->Condition->ConditionData]);
            return sendError($xml->Response->Status->Condition->ConditionData . ' </br></br> ' . $xml->Response->Status->Condition->ConditionCode);
        } else {
            $this->order->updateOrder($this->order_id, $xml->Pieces->Piece->LicensePlate, 'Successfully Submitted Order', 8, $xml->AirwayBillNumber);
            $activityLib->log($this->order_id, 'Order changed to SHIPPED');
            $trackingLib->sendTracking($this->order_id, true);
        }

        $activityLib->log($this->order_id, 'DHL request label');

        $params = [
            'gif' => false,
            'paper_invoice' => false,
            'resend' => false,
        ];

        return sendResponse($params, 'Success');
    }
}
