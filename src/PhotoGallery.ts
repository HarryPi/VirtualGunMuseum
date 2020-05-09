import $ from 'jquery';
import {GunModel} from "./models/DTO/gun.model";
import {HTMLCreator} from "./HTML/HTMLCreator";
import {ModalSection} from "./BootstrapHelpers/Constants";
import {ItemCreator} from "./ItemViews/ItemCreator";

export class PhotoGallery {
    private htmlCreator: HTMLCreator;
    private modalIdMap: Map<ModalSection, string>;
    private className = 'PhotoGallery';

    constructor() {
        this.htmlCreator = new HTMLCreator();
        this.modalIdMap = new Map<ModalSection, string>();
        this.modalIdMap.set(ModalSection.TITLE, 'gunModalTitle');
        this.modalIdMap.set(ModalSection.BODY, 'gunModalBody');
        this.modalIdMap.set(ModalSection.MODAL, 'gunModal');
    }

    /**
     * Generates a photo gallery based on a json string of gun models
     * @param guns
     * @param whereById The id of the location to place the gallery
     */
    public generatePhotoGalleryHtml(guns: GunModel[], whereById: string) {
        const gunModels: GunModel[] = guns;
        this.htmlCreator
            .asNewElement()
            .createBootstrapRow();

        gunModels.forEach((gun: GunModel, index: number) => {
            this.htmlCreator.createBootstrapColumn([
                {colSize: 12, colBreakpoint: "xs"},
                {colSize: 12, colBreakpoint: "sm"},
                {colSize: 6, colBreakpoint: "md"},
            ]).injectAtColumn(this.generateModelCard(gun), index);
        })
        this.htmlCreator.createModal(
            this.modalIdMap.get(ModalSection.MODAL),
            this.modalIdMap.get(ModalSection.TITLE),
            this.modalIdMap.get(ModalSection.BODY))
            .injectCreatedContentAt($('#museumPhotoItems'));

        // Unfortunately we cant do this in the previous loop as the HTML has not been injected yet
        // We use __ class name as the DB id will most likely alone not be unique across tables thus we might end up
        // With multiple similar ids for different views instead we prefix __classname and __purpose to ensure uniqueness
        // This convention allows us to later on strip down to the original id by getting the first occurrence of __
        gunModels.forEach(gun => {
            this.setOnClickImagePopup(`#${gun.id}__${this.className}`);
            this.setOnLinkClickRedirect(`#${gun.id}__${this.className}__link`);
        })
    }

    /**
     * Generates a nice templated image with text
     *
     * @param gunModel The model to format the template from
     */
    private generateModelCard(gunModel: GunModel): JQuery<HTMLElement> {
        // language=HTML
        return $(`<div class="card w-100">
    <div>
        <img class="card-img-top" id="${gunModel.id}__${this.className}" src="${gunModel.url}"
             alt="Card image cap">
    </div>
    <div class="card-body">
        <h5 class="card-title">${gunModel.name}</h5>
        <p class="card-subtitle">Click on the image to see it zoomed in!</p>
        <p class="card-text">${gunModel.shortDescription}</p>
        <button id="${gunModel.id}__${this.className}__link" class="btn btn-primary">Go somewhere</button>
    </div>
</div>`)
    }

    private setOnLinkClickRedirect(id: string) {
        $(id).on('click', () => {
            const itemCreator = new ItemCreator();
            itemCreator.createPageForItem(id.substr(0, id.indexOf('__'))); // Strip all class id seperators
        });
    }

    private setOnClickImagePopup(id: string) {
        // Here we bind the clicks on the card images
        // We want to mimick that the picture has left the card and moved to the modal
        let cardImg = $(id).parent();

        cardImg.on('click', () => {
            // First store the image in a temp variable
            const tempImage = cardImg.html();
            cardImg = cardImg.empty(); // Clear the card
            // make the modal appear
            const modal = $(`#${this.modalIdMap.get(ModalSection.MODAL)}`).modal('show');
            $($(tempImage)).appendTo(modal.find('div.modal-body')); // append the temp image to modal
            modal.on('hide.bs.modal', (event: Event) => {
                cardImg.empty();
                $($(tempImage)).appendTo(cardImg);
                modal.find('div.modal-body').empty();
            })
        })
    }
}