<?php

use Dotenv\Dotenv;
use PizzaApp\App;


require __DIR__ . '/../vendor/autoload.php';


// load environment vars
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


file_put_contents('access.log', $_SERVER['REQUEST_URI'], FILE_APPEND);


App::start();