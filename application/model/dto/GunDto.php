<?php namespace DTO;

    class GunDto extends Dto {
        private int $id;
        private string $name;
        private string $shortDescription;

        /**
         * GunDto constructor.
         * @param int    $id
         * @param string $name
         * @param string $shortDescription
         */
        public function __construct(int $id, string $name, string $shortDescription) {
            parent::__construct();
            $this->id = $id;
            $this->name = $name;
            $this->shortDescription = $shortDescription;
        }


    }