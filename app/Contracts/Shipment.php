<?php

namespace App\Contracts;

interface Shipment
{
    public function ship(int $id);
}
