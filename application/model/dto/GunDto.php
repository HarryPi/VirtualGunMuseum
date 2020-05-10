<?php namespace DTO;

    class GunDto extends Dto {
        private $id;
        private $name;
        private $shortDescription;
        private $url;
        private $url_x3d;

        /**
         * GunDto constructor.
         * @param $id
         * @param $name
         * @param $shortDescription
         * @param $url
         * @param $url_x3d
         */
        public function __construct($id, $name, $shortDescription, $url, $url_x3d) {
            $this->id = $id;
            $this->name = $name;
            $this->shortDescription = $shortDescription;
            $this->url = $url;
            $this->url_x3d = $url_x3d;
        }


    }