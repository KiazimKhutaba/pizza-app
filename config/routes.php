<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use PizzaApp\Controllers\API\ProductsController;
use PizzaApp\Controllers\EntryPointController;


return function (App $app) {

    $app->get('/', EntryPointController::class . ':index' );

    // index
    $app->group('/api/v1', function(RouteCollectorProxy $group) {
        
        $group->get('/products', ProductsController::class . ':all' );

        $group->get('/test', function($req, $res) {

            $res->getBody()->write('tettts');

            return $res;
        });
        //$group->get('/post/{url}', PostController::class . ':index');
    });


    return $app;
};