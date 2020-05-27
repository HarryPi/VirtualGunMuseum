<?php namespace Models;

use DaoPDO\PDOModel;

class AboutModel extends PDOModel {
    public function __construct($table = 'about') {
        parent::__construct($table);
    }

    public function getMarkdown($class) {
        return $this->pdoModel->query('SELECT * FROM about WHERE id = 1')
            ->fetchAll(\PDO::FETCH_CLASS, $class)[0];
    }

    public function getDiagram($class) {
        return $this->pdoModel->query('SELECT * FROM about WHERE id = 2')
            ->fetchAll(\PDO::FETCH_CLASS, $class)[0];
    }
}