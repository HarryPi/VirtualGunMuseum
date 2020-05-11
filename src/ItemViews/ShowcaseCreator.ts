import {HTMLCreator} from "../HTML/HTMLCreator";
import {X3DomRenderer} from "../HTML/X3DomRenderer";
import {ShowcaseCameras} from "../ShowcaseCameras";

export class ShowcaseCreator {
    private htmlCreator: HTMLCreator;

    constructor() {
        this.htmlCreator = new HTMLCreator();
    }

    createShowcaseCard(where: JQuery) {
        this.htmlCreator
            .asNewElement()
            .createBootstrapRow()
            .createBootstrapColumn([
                {colBreakpoint: "xs", colSize: 12}
            ])
            .injectAtColumn(X3DomRenderer.createInlineAsCard('application/assets/x3dom/models/showcase.x3d', 'showcase'), 0)
            .injectCreatedContentAndClear(where);

        this.htmlCreator
            .asNewElement()
            .createBootstrapRow()
            .createBootstrapIdenticalColumns([
                {colBreakpoint: "xs", colSize: 3}
            ], '', 4)
            .prepareButtonDropdown({
                dropdownName: 'Cameras',
                dropdownButtons: [
                    {
                        buttonName: 'Zoomed In',
                        buttonAction: () => {
                            $(`#showcase__${ShowcaseCameras.CAMERA_NEAR}`).attr('set_bind', 'true')
                        }
                    },
                    {
                        buttonName: 'Zoomed Out',
                        buttonAction: () => {
                            $(`#showcase__${ShowcaseCameras.CAMERA_FAR}`).attr('set_bind', 'true')
                        }
                    }

                ]
            })
            .injectAtColumn(null, 0)
            .prepareButtonDropdown({
                dropdownName: 'Animations',
                dropdownButtons: [
                    {
                        buttonName: 'Open Doors',
                        buttonAction: () => {
                            $(`#showcase__OpenDoorTimer`).attr('enabled', 'true')
                            $('#showcase__ExplodeTimer').attr('loop', 'false')
                            $('TimeSensor').attr('loop', 'false');
                        }
                    }
                ]
            })
            .injectAtColumn(null, 1)
            .injectCreatedContentAt($('div.card-body'))
        X3DomRenderer.reload();
    }
}