<?php

// Create the controller class for the MVC design pattern
    class Controller {

        // Declare public variables for the controller class
        public $load;
        public $model;

        // Create functions for the controller class
        function __construct($pageURI = null) // constructor of the class
        {
            $this->load = new Load();
            $this->model = new GunModel();
            // determine what page you are on
            $this->$pageURI();
        }

        // home page function
        function home() {
            // We do not want to get data here
            // If we do this will slow the page load with no indication to the user instead
            // We load the page and then using JS we will call the api for data
            $this->load->view('home');
        }

    }
