<?php

namespace PizzaApp;

use DI\Container;
use Slim\Factory\AppFactory;



class App
{
    public static function start() 
    {
       
        // Create Container using PHP-DI
        $container = new Container();

        // set services
        $services = require(__DIR__ . '/../config/services.php');
        $container = $services($container);

        // Set container to create App with on AppFactory
        AppFactory::setContainer($container);

        $app = AppFactory::create();

        // setup orm
        $container->get('orm');

        $routes = require(__DIR__ . '/../config/routes.php');
        $app = $routes($app);

        /**
         * @var \Slim\App $app
         */
        $app->addErrorMiddleware(true, false, false);


        $app->run();
    }
}