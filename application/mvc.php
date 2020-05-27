<?php namespace mvc;

use Controllers\AboutController;
use Controllers\HomeController;
use Klein\Request;
use Klein\Response;

require 'view/load.php';
require 'model/GunModel.php';
require 'controller/HomeController.php';
require 'helpers/Helpers.php';
require 'model/dto/Dto.php';
require 'model/dto/GunDto.php';
require 'controller/AboutController.php';
require 'model/AboutModel.php';

require_once __DIR__ . '/vendor/autoload.php';

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

$klein->respond('GET', $basePath . '/home/guns', function (Request $request, Response $response, $service) {
    try {
        $controller = new HomeController();
        $response->json($controller->apiGetAllGuns());
    } catch (\Exception $e) {
        $response->code(400);
        $response->body($e->getMessage());
    }
});

$klein->respond('GET', $basePath . '/home/guns/[:id]', function (Request $request, Response $response, $service) {
    try {
        $controller = new HomeController();
        $response->json($controller->apiGetGunById($request->id));
    } catch (\Exception $e) {
        $response->code(400);
        $response->body($e->getMessage());
    }
});

$klein->respond('GET', $basePath . '/about', function (Request $request, Response $response, $service) {
    try {
        $controller = new AboutController();
        $response->json($controller->apiGetAbout());
    } catch (\Exception $e) {
        $response->code(400);
        $response->body($e->getMessage());
    }
});
$klein->respond('GET', $basePath . '/about/markdown', function (Request $request, Response $response, $service) {
    try {
        $controller = new AboutController();
        $response->json($controller->apiGetAboutMarkdown());
    } catch (\Exception $e) {
        $response->code(400);
        $response->body($e->getMessage());
    }
});

// Fallback route in case nothing is found;
$klein->respond(function () {
    $controller = new HomeController();
    $controller->home();
});

$klein->dispatch();