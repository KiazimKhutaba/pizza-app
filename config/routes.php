<?php

use PizzaApp\Controllers\API\OrderController;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use PizzaApp\Controllers\API\ProductsController;
use PizzaApp\Controllers\EntryPointController;


return function (App $app) {

    // index
    $app->group('', function(RouteCollectorProxy $group) {
        
        $group->get('/',      EntryPointController::class . ':index' );
    });

    
    // api
    $app->group('/api/v1', function(RouteCollectorProxy $group) {
        
        $group->get('/products', ProductsController::class . ':all' );
        
        $group->get('/orders',   OrderController::class    . ':all' );
        $group->post('/order',   OrderController::class    . ':create' );
    });


    return $app;
};