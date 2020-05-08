<?php namespace mvc;

use Controllers\HomeController;
use Klein\Request;

require_once __DIR__ . '/vendor/autoload.php';
require 'view/load.php';
require 'model/GunModel.php';
require 'controller/HomeController.php';
require 'helpers/Helpers.php';

$klein = new \Klein\Klein();

// We do the defines here so that we can have the absolute path relevant to the application folder
define('DATABASE_PATH', __DIR__ . '/db/gundatabase.db');

$basePath = '/~cp464/VirtualGunMuseum';
$klein->respond('GET', $basePath . '/', function () {
    $controller = new HomeController();
    $controller->home();
});

$klein->respond('GET', $basePath . '/home', function () {
    $controller = new HomeController();
    $controller->home();
});

$klein->respond('GET', $basePath.'/home/getAllGuns', function (Request $request, $response, $service) {
    $controller = new HomeController();
    $send = $request->param('format', 'json'); // send as json
    $response->$send($controller->apiGetAllGuns());
});

// Fallback route in case nothing is found;
$klein->respond(function () {
    echo 'here';
    $controller = new HomeController();
    $controller->home();
});

$klein->dispatch();