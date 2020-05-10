import {GunModel} from "../models/DTO/gun.model";
import {HTMLCreator} from "../HTML/HTMLCreator";
import {X3DomRenderer} from "../HTML/X3DomRenderer";
import {UrlLoader} from "../Loader/UrlLoader";
import {HttpResponseAction} from "../ResponseHelpers/HttpResponseAction";
import {ShowcaseCameras} from "../ShowcaseCameras";

declare var x3dom: any;

export class ItemCreator {
    private htmlCreator: HTMLCreator;

    constructor() {
        this.htmlCreator = new HTMLCreator();
    }

    async createPageForItem(gunId: string): Promise<void> {
        gunId = gunId.replace('#', '');
        console.log(`http://users.sussex.ac.uk/~cp464/VirtualGunMuseum/index.php/home/guns/${gunId}`);
        // Fetch the single gun model from API

        const gunModel: GunModel = await new UrlLoader()
            .urlToCall(`http://users.sussex.ac.uk/~cp464/VirtualGunMuseum/index.php/home/guns/${gunId}`)
            .actionOnFailure(HttpResponseAction.SHOW_USER_MESSAGE)
            .callUrlAndParseAsJson<GunModel>();

        this.htmlCreator
            .asNewElement()
            .createBootstrapRow()
            .createBootstrapColumn([
                {colBreakpoint: "xs", colSize: 12}
            ])
            .injectAtColumn(X3DomRenderer.createInlineAsCard(gunModel.url_x3d, 'gunModel'), 0)
            .find('div.card-body')
            .createBootstrapRow()
            .createBootstrapIdenticalColumns([
                {colBreakpoint: "xs", colSize: 3}
            ], '', 4)
            .prepareButtonDropdown({
                dropdownName: 'Animations',
                dropdownButtons: [
                    {
                        buttonName: 'Explode Weapon',
                        buttonAction: () => {
                            $('#gunModel__ExplodeTimer').attr('enabled', 'true')
                            $('#gunModel__ExplodeTimer').attr('loop', 'false')
                        }
                    }

                ]
            })
            .injectAtColumn(null, 0)
            .prepareButtonDropdown({
                dropdownName: 'Cameras',
                dropdownButtons: [
                    {
                        buttonName: 'Front Camera',
                        buttonAction: () => {
                            $(`#gunModel__${ShowcaseCameras.CAMERA_FRONT}`).attr('set_bind', 'true')
                        }
                    },
                    {
                        buttonName: 'Back Camera',
                        buttonAction: () => {
                            $(`#gunModel__${ShowcaseCameras.CAMERA_BACK}`).attr('set_bind', 'true')
                        }
                    },
                    {
                        buttonName: 'Left Camera',
                        buttonAction: () => {
                            $(`#gunModel__${ShowcaseCameras.CAMERA_LEFT}`).attr('set_bind', 'true')
                        }
                    },
                    {
                        buttonName: 'Right Camera',
                        buttonAction: () => {
                            $(`#gunModel__${ShowcaseCameras.CAMERA_RIGHT}`).attr('set_bind', 'true')
                        }
                    }

                ]
            })
            .injectAtColumn(null, 1)
            .prepareButtonDropdown({
                dropdownName: 'Wireframes',
                dropdownButtons: [
                    {
                        buttonName: 'Toggle Wireframes',
                        buttonAction: () => {
                            //@ts-ignore
                            document.getElementById('x3dom__model').runtime.togglePoints(true);
                            //@ts-ignore
                            document.getElementById('x3dom__model').runtime.togglePoints(true);
                        }
                    }

                ]
            })
            .injectAtColumn(null, 2)
            .prepareButtonDropdown({
                dropdownName: 'Lights',
                dropdownButtons: [
                    {
                        buttonName: 'Decrease Brightness',
                        buttonAction: () => {
                            $('SpotLight')
                                .toArray()
                                .forEach(light => $(light).attr('intensity', Number($(light).attr('intensity')) - 0.15))
                        }
                    },
                    {
                        buttonName: 'Increase brightness',
                        buttonAction: () => {
                            $('SpotLight')
                                .toArray()
                                .forEach(light => $(light).attr('intensity', Number($(light).attr('intensity')) + 0.15))
                        }
                    }
                ]
            })
            .injectAtColumn(null, 3)
            .cancelFind()
            .injectCreatedContentAndClear($('#mainContent'));
        x3dom.reload();
    }
}