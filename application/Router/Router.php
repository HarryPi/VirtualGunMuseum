<?php
    namespace router;


    class Router {
        private $path;

        public function __construct($path) {
            $this->path = $path;
            echo $_SERVER['DOCUMENT_ROOT'];
        }
    }