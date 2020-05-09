import $ from 'jquery';
import {PhotoGallery} from "./PhotoGallery";
import {ResponsePhp} from "./ResponseHelpers/ResponsePhp";
import {HTMLCreator} from "./HTML/HTMLCreator";
import {LoaderCreator, LoaderKind} from "./Loader/Loader";

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
    const onDataLoaded = fetch('http://users.sussex.ac.uk/~cp464/VirtualGunMuseum/index.php/home/getAllGuns', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const jsonData: ResponsePhp = new ResponsePhp(await onDataLoaded);

    if (jsonData.ok) {
        const data = await jsonData.fromPhpToJsonFormatString();
        $('#museumPhotoItems').empty();
        gallery.generatePhotoGalleryHtml(data, 'museumPhotoItems');
    }


}
