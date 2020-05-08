<?php namespace Controllers;
    require_once './application/view/load.php';
    require_once 'BaseController.php';

    use mvc\Load;
    use Models\GunModel;
    use PDOException;
    use Psr\Container\ContainerInterface;
    use Slim\Psr7\Request;
    use Slim\Psr7\Response;

// Create the controller class for the MVC design pattern
    class HomeController extends BaseController {

        // Declare public variables for the controller class
        public $load;
        public $model;
        // Create functions for the controller class
        function __construct(ContainerInterface $container) // constructor of the class
        {
            parent::__construct($container);
            $this->load = new Load();
            $this->model = new GunModel();
            // determine what page you are on
        }

        // home page function
        function home(Request $request, Response $response, $args) {
            // We do not want to get data here
            // If we do this will slow the page load with no indication to the user instead
            // We load the page and then using JS we will call the api for data
            $this->load->view('home');
            return $response;
        }

        function apiGetAllGuns() {
            try {
                $guns = $this->model->getAll();
                http_response_code(200);
                echo json_encode($guns);
            } catch (PDOException $exception) {
                http_response_code(500);
                echo json_encode('We failed to get your data please try again.');
            }
        }
    }
