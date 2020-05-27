<?php namespace Controllers;

use Models\AboutModel;

class AboutController extends BaseController {

    // Declare public variables for the controller class
    public $model;

    // Create functions for the controller class
    function __construct() // constructor of the class
    {
        parent::__construct();
        $this->model = new AboutModel();
        // determine what page you are on
    }

    function apiGetAbout() {
        return $this->model->getAll(AboutModel::class);
    }

    public function apiGetAboutMarkdown() {
        $path = $this->model->getMarkdown(AboutModel::class); // Get the markdown text
        $pathToSeqDiagram = $this->model->getDiagram(AboutModel::class); // Get the diagram
        $fileContent = str_replace('__REPLACE_ME_WITH_SEQ_DIAGRAM__', $pathToSeqDiagram->path, file_get_contents
        ($path->path));
        return $fileContent;
    }

}
