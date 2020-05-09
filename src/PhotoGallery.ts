import {ShowcaseCameras} from "./ShowcaseCameras";
import $ from 'jquery';
import {GunModel} from "./models/DTO/gun.model";
import {ColumnModel} from "./BootstrapHelpers/Column.model";

export class PhotoGallery {
    private currentView: string;
    private photoItemsId = 'museumPhotoItems'

    constructor() {
    }

    /**
     * Generates a photo gallery based on a json string of gun models
     * @param jsonGunModels The json string that should contain the gun models
     * @param whereById The id of the location to place the gallery
     */
    public generatePhotoGalleryHtml(jsonGunModels: string, whereById: string) {
        const gunModels: GunModel[] = JSON.parse(jsonGunModels);
        const row = this.generateRowDiv();
        for (let gun of gunModels) {
            row.append(this.generateColumn([
                {
                    colSize: 6,
                    colBreakpoint: 'lg'
                },
                {
                    colSize: 12,
                    colBreakpoint: 'md'
                }
            ], gun))
        }
        console.log(row);
        $(`#${whereById}`).append(row);
    }

    private generateRowDiv(): JQuery<HTMLElement> {
        return $('<div></div>', {
            id: PhotoGallery.name,
            'class': 'row text-left'
        });
    }

    /**
     * Generates a nice templated column
     *
     * @param columnSizes Can recieve multiple bootstrap column like objects to apply as classes
     * @param gunModel The model to format the template from
     */
    private generateColumn(columnSizes: ColumnModel[], gunModel: GunModel): JQuery<HTMLElement> {
        // language=HTML
        return $('<div></div>', {
            'class': columnSizes.map((col: ColumnModel) => {
                return `col-${col.colBreakpoint}-${col.colSize}`
            }).join(' '),
            id: gunModel.id + PhotoGallery.name
        }).append(`
        <div class="view overlay rounded z-depth-1-half mb-3">
            <img class="img-fluid" src='${gunModel.url}' />
        </div>
        <h3 class="h4">
            ${gunModel.shortDescription}
        </h3>
        <p class="text-body">${gunModel.description}</p>
        <hr>
        `);
    }
}