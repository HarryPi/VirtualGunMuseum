<?php namespace Models;
    require 'dao/PDOModel.php';

    use \DaoPDO\PDOModel;


class GunModel extends PDOModel {
    public function __construct(string $table = 'guns') {
        parent::__construct($table);
    }
}
