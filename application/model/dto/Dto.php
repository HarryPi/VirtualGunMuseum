<?php


    abstract class Dto {

        /**
         * Dto constructor.
         */
        public function __construct() {
        }

        public function __get($name) {
            if (method_exists($this, $name)) {
                return $this->$name();
            } else if (property_exists($this, $name)) {
                // Getter setter not defined so return it as property if exists
                return $this->$name;
            }
            // Else doesnt exist so null
            return null;
        }

        function __set($name, $value) {
            if (method_exists($this, $name)) {
                $this->$name($value);
            } else {
                // Getter/Setter not defined so set as property of object
                $this->$name = $value;
            }
        }

    }