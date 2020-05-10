import {GunModel} from "../models/DTO/gun.model";
import {HTMLCreator} from "../HTML/HTMLCreator";
import {X3DomRenderer} from "../HTML/X3DomRenderer";
import {UrlLoader} from "../Loader/UrlLoader";
import {HttpResponseAction} from "../ResponseHelpers/HttpResponseAction";

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
            .createButtonDropdown()
            .cancelFind()
            .injectCreatedContentAndClear($('#mainContent'));
        x3dom.reload();
    }
}