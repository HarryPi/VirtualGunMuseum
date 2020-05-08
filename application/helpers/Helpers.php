<?php

    namespace Helpers;


    class Helpers {
        public static function stringContains($needle, $haystack) {
            return strpos($haystack, $needle) !== false;
        }
    }