<?php

namespace PizzaApp\Controllers\API;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;
use stdClass;


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
        $obj = new stdClass;
        $obj->name='Test';
        $obj->var='222';
        $obj->childs = ['1', '2', '3'];

        $response->getBody()->write(json_encode($obj));

        return $response;
    }

}
