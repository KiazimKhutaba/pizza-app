<?php

namespace PizzaApp\Helpers;


function env($varname, $default = "") {
    return !empty($_ENV[$varname]) ? $_ENV[$varname] : $default;
}