<?php

namespace App\Library;

use GuzzleHttp;
use SimpleXMLElement;
use App\Library\Order;
use App\Library\Client;
use App\Helpers\Generic;
use App\Library\Setting;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

/**
 * Undocumented class
 */
class Tracking
{
    private $order;
    private $setting;
    private $client;
    private $invoiceEndpoint = 'https://www.esasys.co.uk/invoices/generate/';

    public function __construct()
    {
        $this->order = new Order;
        $this->setting = new Setting;
        $this->client = new Client;

        if (config('app.esa')) {
            $this->invoiceEndpoint = config('app.esa') . '/invoices/generate/';
        }
    }

    /**
     * Send tracking
     *
     * @param int $id
     * @param boolean $request
     * @return bool|string
     */
    public function sendTracking($id, $request = true)
    {
        $order = $this->order->getOrderDetails($id);
        $setting = $this->setting->getSetting($order->DeliveryID);
        $client = $this->client->getClient($order->ClientID);

        if (!$order || !$setting || !$client) {
            return false;
        }

        $tracking = [
            'DeliveryCompany' => $setting->Name,
            'TrackingLink' => $setting->Value,
            'TrackingCode' => $order->TrackingCode,
            'RefID' => $order->ReferenceNumber,
            'TrackingRef' => $order->ReferenceNumber . '-' . $order->PrescriptionID,
            'Username' => $client->ReturnUsername,
            'Password' => $client->ReturnPassword,
        ];
        $contentType = 'text/xml; charset=UTF8';
        $fileType = '.xml';

        $allow_json_tracking = explode(',', config('esa.allow_json_tracking_to_client'));
        if (in_array($order->ClientID, $allow_json_tracking)) {
            $contentType = 'application/json';
            $body = json_encode($tracking);
            $fileType = '.json';
        } else {
            $body = Generic::arrayToXml($tracking, new SimpleXMLElement('<ESATracking/>'));
        }

        $options = [
            'headers' => [
                'Content-Type' => $contentType,
            ],
            'body' => $body, //send it via body as xml
        ];

        if (isAzureStorageEnabled()) {
            Storage::disk('azure')->put('ups_xml/tracking-code-send-' . $id . $fileType, $body);
        } else {
            Storage::put('ups_xml/tracking-code-send-' . $id . $fileType, $body);
        }

        if (App::environment('local') || empty($client->ReturnURL)) {
            $returnURL = route('default_return');
        } else {
            $returnURL = $client->ReturnURL;
        }

        if ($request) {
            //call external endpoint
            try {
                $req = new GuzzleHttp\Client($options);
                $req->request('POST', $returnURL, $options)->getBody()->getContents();
            } catch (GuzzleHttp\Exception\RequestException $exception) {
                if ($exception->getResponse() != null) {
                    return $exception->getResponse()->getBody()->getContents();
                } else {
                    return 'Empty Response';
                }
            }

            //call ESA invoice endpoint
            try {
                $req = new GuzzleHttp\Client();
                $req->request('GET', $this->invoiceEndpoint . $id);
            } catch (GuzzleHttp\Exception\RequestException $exception) {
                Log::error($returnURL);
                Log::error($exception->getMessage());
                return $exception->getResponse()->getBody()->getContents();
            }
        }

        return true;
    }
}
