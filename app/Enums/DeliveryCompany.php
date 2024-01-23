<?php

namespace App\Enums;

enum DeliveryCompany: string
{
    case DPD = '4';
    case ROYALMAIL = '5';
    case UPS = '7';
    case DHL = '10';
}
