<?php

use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Middleware\ContentLengthMiddleware;

use Slim\Psr7\Response;

return function (App $app) {

    $middlewares = [];
};