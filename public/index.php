<?php

use Dotenv\Dotenv;
use PizzaApp\App;


require __DIR__ . '/../vendor/autoload.php';


// load environment vars
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();



App::start();