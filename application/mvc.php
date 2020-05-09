<?php namespace mvc;

use Controllers\HomeController;
use Klein\Request;
use Klein\Response;

require_once __DIR__ . '/vendor/autoload.php';
require 'view/load.php';
require 'model/GunModel.php';
require 'controller/HomeController.php';
require 'helpers/Helpers.php';

$klein = new \Klein\Klein();

// We do the defines here so that we can have the absolute path relevant to the application folder
define('DATABASE_PATH', __DIR__ . '/db/gundatabase.db');

$basePath = '/~cp464/VirtualGunMuseum/index.php';
$klein->respond('GET', $basePath . '/', function () {
    $controller = new HomeController();
    $controller->home();
});

$klein->respond('GET', $basePath . '/home', function () {
    $controller = new HomeController();
    $controller->home();
});

$klein->respond('GET', $basePath.'/home/getAllGuns', function (Request $request, Response $response, $service) {
    $controller = new HomeController();
    $response->json($controller->apiGetAllGuns());
});

// Fallback route in case nothing is found;
$klein->respond(function () {
    $controller = new HomeController();
    $controller->home();
});

$klein->dispatch();