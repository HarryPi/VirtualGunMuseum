<?php namespace Controllers;
    require_once './application/view/load.php';
    require_once 'BaseController.php';

    use mvc\Load;
    use Models\GunModel;
    use PDOException;

// Create the controller class for the MVC design pattern
    class HomeController extends BaseController {

        // Declare public variables for the controller class
        public $load;
        public $model;
        // Create functions for the controller class
        function __construct() // constructor of the class
        {
            parent::__construct();
            $this->model = new GunModel();
            // determine what page you are on
        }

        // home page function
        function home() {
            // We do not want to get data here
            // If we do this will slow the page load with no indication to the user instead
            // We load the page and then using JS we will call the api for data
            $this->load = new Load();
            $this->load->view('home');
        }

        function apiGetAllGuns() {
            try {
                return $this->model->getAll(GunModel::class);
            } catch (PDOException $exception) {
                return json_encode('We failed to get your data please try again.');
            }
        }

        function apiGetGunById($id) {
            return $this->model->get($id, GunModel::class);
        }
    }
