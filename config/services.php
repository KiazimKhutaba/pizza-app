<?php

use function PizzaApp\Helpers\env;
use Illuminate\Database\Capsule\Manager as Capsule;


return function (DI\Container $container) : DI\Container {

    // set db
    $container->set('db', function() {

        $dsn = sprintf("%s:dbname=%s;host=%s", env('DB_ADAPTER'), env('DB_NAME'), env('DB_HOST'));
        
        return \PizzaApp\DB::get($dsn, env('DB_USER'), env('DB_PASS'));
    });


    // set views engine
    $container->set('twig', function() {
            
        $loader = new \Twig\Loader\FilesystemLoader([
            __DIR__ . '/../views' 
        ]);

        $twig   = new \Twig\Environment($loader, [ __DIR__ . '/../var/cache' ]);
    
        return $twig;
    });



    // eloquent orm
    $container->set('orm', function() {
        
        $capsule = new Capsule();

        $capsule->addConnection([
            'driver'    => env('DB_ADAPTER'),
            'host'      => env('DB_HOST'),
            'database'  => env('DB_NAME'),
            'username'  => env('DB_USER'),
            'password'  => env('DB_PASS'),
            'charset'   => env('DB_CHARSET'),
            'collation' => env('DB_COLLATION'),
            'prefix'    => env('DB_PREFIX'),
        ]);


        // Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
        $capsule->bootEloquent();

        return $capsule;
    });


    return $container;
};

