<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="node_modules/bootswatch/dist/darkly/bootstrap.min.css"/>
    <link rel="stylesheet" href="node_modules/x3dom/x3dom.css">
    <link rel="stylesheet" href="index.css">
</head>

<body>
<div id="overlay" style="display:none;">
    <div class="spinner"></div>
    <br/>
    Loading...
</div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li id="home" class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li id="about" class="nav-item active">
                <a class="nav-link" href="#">About (Deeper understanding) <span class="sr-only"></span></a>
            </li>
            <li class="nav-item dropdown" id="gunDropdown">

            </li>
        </ul>
    </div>
</nav>

<main class="mt-5 pt-5">
    <div class="container">
        <div id="mainContent">
            <!--Section: Jumbotron-->
            <section class="card" style="background-image: url(application/assets/images/hero-background.jpg)">

                <!-- Content -->
                <div class="card-body text-white text-center py-5 px-5 my-5">

                    <h1 class="mb-4">
                        <strong>Welcome to the Gun Museum!</strong>
                    </h1>
                    <p>
                        <strong>Scroll further down to see our selection individually or click here to go to our
                            showcase! ( All the weapons in a nice cabinet )</strong>
                    </p>
                    <a href="#" id="goToShowcase" class="btn btn-outline-white btn-lg">
                        Go to our showcase!
                        <i class="fas fa-graduation-cap ml-2"></i>
                    </a>

                </div>
                <!-- Content -->
            </section>
            <!--Section: Jumbotron-->

            <hr class="my-5">

            <div class="wow fadeIn flex-row flex-wrap">

                <!--Section heading-->
                <div class="my-5 col-md-12 row text-center">
                    <h2 class="col-sm-12 h1 font-weight-bold">Our collection</h2>
                    <h6 class="col-sm-12 h6 font-weight-bold">
                        <strong>Gallery with photo-realistic materials</strong>
                    </h6>
                </div>
                <!--Grid row-->
                <div class="col-md-12" id="museumPhotoItems"></div>
                <!--Grid row-->

            </div>

        </div>
    </div>
</main>
<!--Main layout-->
<footer id="sticky-footer" class="py-4 bg-dark text-white-50">
    <div class="container text-center">
       <div class="row">
          <small>Source code link, 4 models and VRML models can be found at the about page along side some
              information about the project, please check it out!</small>
       </div>
    </div>
</footer>
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="node_modules/x3dom/x3dom.js"></script>
<script src="dist/0.bundle.js"></script>
<script src="dist/bundle.js"></script>
</body>
</html>