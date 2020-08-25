<?php

namespace PizzaApp\Controllers\API;

use PizzaApp\Models\Order;
use PizzaApp\Models\Product;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;


class OrderController
{
    protected $container;


    // constructor receives container instance
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }


    /**
     * Return all products
     */
    public function create(Request $request, Response $response, array $args)
    {
        // Todo: !!!! AKHTUNG !!!! DANGEROUS !!! NOT FOR PRODUCTION !!!!
        $order = Order::create($request->getParsedBody());

        $response->getBody()->write(
            json_encode(['code' => 100, 'text' => 'created'])
        );

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');     ;
    }


    public function all(Request $request, Response $response)
    {
        $userOrders = Order::where(['name' => 'Dilan'])->get();
        $response->getBody()->write(json_encode($userOrders));

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');    
    }
}
