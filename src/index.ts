import $ from 'jquery';
import {PhotoGallery} from "./PhotoGallery";
import {HTMLCreator} from "./HTML/HTMLCreator";
import {LoaderCreator, LoaderKind} from "./Loader/Loader";
import {UrlLoader} from "./Loader/UrlLoader";
import {HttpResponseAction} from "./ResponseHelpers/HttpResponseAction";
import {GunModel} from "./models/DTO/gun.model";
import {ItemCreator} from "./ItemViews/ItemCreator";
import {ShowcaseCreator} from "./ItemViews/ShowcaseCreator";
import {Markdown} from "./MarkdownHelper/markdown";

$(bindFunctions);


async function bindFunctions() {
    const htmlCreator = new HTMLCreator();
    const gallery: PhotoGallery = new PhotoGallery();
    const loaderCreator = new LoaderCreator(LoaderKind.GRID);
    const markdownUtils = new Markdown();
    const modalId = 'homeModal';
    const modalContent = 'content'


    $('#about').on('click', async () => {
        console.log('clicked');
        const markdown = await new UrlLoader()
            .urlToCall('http://users.sussex.ac.uk/~cp464/VirtualGunMuseum/index.php/about/markdown')
            .actionOnsuccess(HttpResponseAction.SILENCE_AFTER_ACTION)
            .blockUIOnCall(true)
            .actionOnFailure(HttpResponseAction.SHOW_USER_MESSAGE)
            .callUrlAndParseAsJson<string>();
        htmlCreator
            .asNewElement()
            .createBootstrapRow()
            .createBootstrapColumn([{colBreakpoint: "xs", colSize: 12}])
            .injectAtColumn($(`                
                <div>
                    <div id="markdownContent"></div>
                </div>
            `), 0)
            .injectCreatedContentAndClear($('#mainContent'));

        $('#markdownContent').html(markdownUtils.convertMarkdownToHTML(markdown));

        // Here we dynamically search for all images in the markdown and ensure they are responsive
        // by adding img-fluid class of bootstrap
        $('#markdownContent img').each(function () {
            console.log($(this));
            $(this).addClass('img-fluid')
        })
    })

    $('#home').on('click', async () => {
        htmlCreator
            .asNewElement()
            .createBootstrapRow()
            .createBootstrapColumn([
                {colBreakpoint: "xs", colSize: 12}
            ])
            .preparedJumbotron()
            .injectAtColumn(null, 0)
            .injectCreatedContentAndClear($('#mainContent'));

        htmlCreator
            .asNewElement()
            .createBootstrapRow()
            .createBootstrapColumn([{colBreakpoint: "xs", colSize: 12}])
            .injectAtColumn($(`
            <hr class="my-5">
            <div class="wow fadeIn flex-row flex-wrap">
                <!--Section heading-->
                <div class="my-5 col-md-12 row text-center">
                    <h2 class="col-sm-12 h1 font-weight-bold">Our collection</h2>
                    <h6 class="col-sm-12 h6 font-weight-bold">
                        <strong>Gallery with photo-realistic materials</strong>
                    </h6>
                </div>
            `), 0)
            .injectCreatedContentAt($('#mainContent'));

        htmlCreator
            .asNewElement()
            .createBootstrapRow()
            .createBootstrapColumn([{colSize: 12, colBreakpoint: "md"}], '__gallery__')
            .injectCreatedContentAt($('#mainContent'));

        // Before we fire a request to the server ensure some loading indicator is showing
        htmlCreator
            .asNewElement()
            .createBootstrapRow()
            .createBootstrapIdenticalColumns([
                    {colBreakpoint: "sm", colSize: 12},
                    {colBreakpoint: "md", colSize: 6}
                ],
                'd-flex justify-content-center mb-2', 4)
            .injectAtAllColumns(loaderCreator.createLoaderDiv())
            .injectCreatedContentAt($('div.__gallery__'));


        // When loading is done attempt to get gun models
        const gunModels = await new UrlLoader()
            .urlToCall('http://users.sussex.ac.uk/~cp464/VirtualGunMuseum/index.php/home/guns')
            .actionOnFailure(HttpResponseAction.SHOW_USER_MESSAGE)
            .actionOnsuccess(HttpResponseAction.SILENCE_AFTER_ACTION)
            .retryOnFailure(HttpResponseAction.NO_RETRY)
            .callUrlAndParseAsJson<GunModel[]>();

        $('div.__gallery__').empty();
        gallery.generatePhotoGalleryHtml(gunModels, $('div.__gallery__'));

        $('#goToShowcase').on('click', () => {
            const showcase = new ShowcaseCreator();
            showcase.createShowcaseCard($('#mainContent'));
        })
    })
    $('#goToShowcase').on('click', () => {
        const showcase = new ShowcaseCreator();
        showcase.createShowcaseCard($('#mainContent'));
    })
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
    gallery.generatePhotoGalleryHtml(gunModels, $('#museumPhotoItems'));

    // Get list dropdown now that we have the model url
    htmlCreator
        .asAppendToExisting($('#gunDropdown'))
        .prepareButtonDropdown({
            dropdownName: 'Our Guns',
            dropdownButtons: gunModels.map(gun => {
                return {
                    buttonName: gun.name,
                    buttonAction: () => {
                        const itemCreator = new ItemCreator();
                        itemCreator.createPageForItem(gun.id);
                    }
                }
            })
        })
        .injectCreatedContentAndClear(null, true);
}

