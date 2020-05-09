import $ from 'jquery';
import {GunModel} from "./models/DTO/gun.model";
import {HTMLCreator} from "./HTML/HTMLCreator";
import {ModalSection} from "./BootstrapHelpers/Constants";

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
     * @param jsonGunModels The json string that should contain the gun models
     * @param whereById The id of the location to place the gallery
     */
    public generatePhotoGalleryHtml(jsonGunModels: string, whereById: string) {
        const gunModels: GunModel[] = JSON.parse(jsonGunModels);
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
        gunModels.forEach(gun => this.setOnClickImagePopup(`#${gun.id}__${this.className}`))
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
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>`)
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