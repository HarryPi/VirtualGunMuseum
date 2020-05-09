import {GunModel} from "../models/DTO/gun.model";
import {HTMLCreator} from "../HTML/HTMLCreator";
import {ResponsePhp} from "../ResponseHelpers/ResponsePhp";

export class ItemCreator {
    private htmlCreator: HTMLCreator;

    constructor() {
        this.htmlCreator = new HTMLCreator();
    }

    async createPageForItem(gunId: string): Promise<void> {
        // Fetch the single gun model from API
        const phpResponse = new ResponsePhp(
            await fetch(`http://users.sussex.ac.uk/~cp464/VirtualGunMuseum/index.php/home/guns/${gunId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        );
        const textData = phpResponse.
    }
}