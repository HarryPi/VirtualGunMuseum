<?php
class GunModel extends PDOModel {
    public function __construct(string $table = 'guns') {
        parent::__construct($table);
    }
}
