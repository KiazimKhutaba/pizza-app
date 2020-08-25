<?php

namespace PizzaApp;


class RequestValidator
{
    static function validate(array $data): array
    {
        $errors = [];

        foreach($data as $key => $value) {
            
            if( mb_strlen(trim($value)) < 6 ) {
                $errors[] = "Length of $key value should be more then 5 symbols!";
            }
        }

        return $errors;
    }
}