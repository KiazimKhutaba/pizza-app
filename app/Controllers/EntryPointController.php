<?php

namespace PizzaApp\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;



class EntryPointController
{
    protected $container;


    // constructor receives container instance
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }


    public function twig(): \Twig\Environment
    {
        return $this->container->get('twig');
    }

    
    public function index(Request $request, Response $response, array $args) 
    {
        $response->getBody()->write(
            $this->twig()->render('index.html')
        );

        return $response;
    }
}
