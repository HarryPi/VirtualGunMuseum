<?php namespace mvc;
require 'view/load.php';
require 'model/GunModel.php';
require 'controller/HomeController.php';
require 'Router/Router.php';

use Controllers\HomeController;
use router\Router;

// We do the defines here so that we can have the absolute path relevant to the application folder
define('DATABASE_PATH', __DIR__ . '/db/gundatabase.db');

$router = new Router($_SERVER['REQUEST_URI']);