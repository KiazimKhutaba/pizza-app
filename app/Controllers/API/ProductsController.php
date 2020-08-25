<?php

namespace PizzaApp\Controllers\API;

use PizzaApp\Models\Product;
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


    /**
     * Return all products
     */
    public function all(Request $request, Response $response, array $args) 
    {
        $response->getBody()->write(json_encode(Product::all()));

        return $response;
    }

}
