<?php namespace mvc;
require 'view/load.php';
require 'model/GunModel.php';
require 'controller/HomeController.php';
require __DIR__ . '/../vendor/autoload.php';

use Controllers\HomeController;

// Use slim dependancies
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use DI\Container;

// We do the defines here so that we can have the absolute path relevant to the application folder
define('DATABASE_PATH', __DIR__ . '/db/gundatabase.db');
$container = new Container();
AppFactory::setContainer($container);
$app = AppFactory::create();

$app->get('/', HomeController::class . ':home');
$app->get('/home', HomeController::class . ':home');

// After all routes define a catch all routes
// And redirect to home
$app->any('{route:.*}', HomeController::class . ':home');

// Run SLIM
$app->run();