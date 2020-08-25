<?php

namespace PizzaApp\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;



class ProductsController
{
    protected $container;


    // constructor receives container instance
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }



    public function all(Request $request, Response $response, array $args) 
    {
        $response->getBody()->write('HELLO');

        return $response;
    }

}
