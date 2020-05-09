import $ from 'jquery';
import {PhotoGallery} from "./PhotoGallery";
import {ResponsePhp} from "./ResponseHelpers/ResponsePhp";

declare var x3dom: any;

$(bindFunctions);


async function bindFunctions() {
    const gallery: PhotoGallery = new PhotoGallery();

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
        gallery.generatePhotoGalleryHtml(data, 'museumPhotoItems');
    }
}
