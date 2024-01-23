<?php

namespace App\Supports;

use App\Contracts\Shipment;

class DPDShipment implements Shipment
{
    public function ship()
    {
        return 'DPD shipment sent';
    }
}
