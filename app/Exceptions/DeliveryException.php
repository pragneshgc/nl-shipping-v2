<?php

namespace App\Exceptions;

use Exception;

class DeliveryException extends Exception
{
    public function __construct($message, $code, public array $errors = [])
    {
        parent::__construct($message, $code);
    }

    public function getError()
    {
        return $this->errors;
    }
}
