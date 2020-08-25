<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use PizzaApp\Controllers\ProductsController;


return function (App $app) {

    // index
    $app->group('/api/v1', function(RouteCollectorProxy $group) {
        
        $group->get ('/products', ProductsController::class . ':all');

        //$group->get('/post/{url}', PostController::class . ':index');
    });


    return $app;
};