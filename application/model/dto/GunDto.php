<?php namespace DTO;

    class GunDto extends Dto {
        private $id;
        private $name;
        private $shortDescription;

        /**
         * GunDto constructor.
         * @param int    $id
         * @param string $name
         * @param string $shortDescription
         */
        public function __construct($id, $name, $shortDescription) {
            parent::__construct();
            $this->id = $id;
            $this->name = $name;
            $this->shortDescription = $shortDescription;
        }


    }