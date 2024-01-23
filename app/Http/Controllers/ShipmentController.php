<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;
use App\Supports\DHLShipment;
use App\Enums\DeliveryCompany;

class ShipmentController extends Controller
{
    public function shipmentValidation($order_id, Request $request)
    {
        $order = Prescription::select('DeliveryID')
            ->where('PrescriptionID', $order_id)
            ->first();
        return match ($order->DeliveryID) {
            DeliveryCompany::DHL->value => (new DHLShipment)->ship($order_id),
            default => $this->sendError('something went wrong')
        };
    }
}
