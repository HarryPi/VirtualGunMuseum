import $ from 'jquery';
import {PhotoGallery} from "./PhotoGallery";
import {HTMLCreator} from "./HTML/HTMLCreator";
import {LoaderCreator, LoaderKind} from "./Loader/Loader";
import {UrlLoader} from "./Loader/UrlLoader";
import {HttpResponseAction} from "./ResponseHelpers/HttpResponseAction";
import {GunModel} from "./models/DTO/gun.model";

declare var x3dom: any;

$(bindFunctions);


async function bindFunctions() {
    const htmlCreator = new HTMLCreator();
    const gallery: PhotoGallery = new PhotoGallery();
    const loaderCreator = new LoaderCreator(LoaderKind.GRID);

    // Before we fire a request to the server ensure some loading indicator is showing
    htmlCreator
        .createBootstrapRow()
        .createBootstrapIdenticalColumns([
                {colBreakpoint: "sm", colSize: 12},
                {colBreakpoint: "md", colSize: 6}
            ],
            'd-flex justify-content-center mb-2', 4)
        .injectAtAllColumns(loaderCreator.createLoaderDiv())
        .injectCreatedContentAt($('#museumPhotoItems'));


    // When loading is done attempt to get gun models

    const gunModels = await new UrlLoader()
        .urlToCall('http://users.sussex.ac.uk/~cp464/VirtualGunMuseum/index.php/home/guns')
        .actionOnFailure(HttpResponseAction.SHOW_USER_MESSAGE)
        .actionOnsuccess(HttpResponseAction.SILENCE_AFTER_ACTION)
        .retryOnFailure(HttpResponseAction.NO_RETRY)
        .callUrlAndParseAsJson<GunModel[]>();

    $('#museumPhotoItems').empty();
    gallery.generatePhotoGalleryHtml(gunModels, 'museumPhotoItems');


}
