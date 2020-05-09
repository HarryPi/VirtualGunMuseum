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

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                    Dropdown
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
</nav>

<main class="mt-5 pt-5">
    <div id="test"></div>
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
                            showcase!</strong>
                    </p>
                    <a target="_blank" href="#" class="btn btn-outline-white btn-lg">
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

<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="node_modules/x3dom/x3dom.js"></script>
<script src="dist/0.bundle.js"></script>
<script src="dist/bundle.js"></script>
</body>
</html>