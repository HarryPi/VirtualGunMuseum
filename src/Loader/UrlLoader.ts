import {HttpResponseAction} from "../ResponseHelpers/HttpResponseAction";
import {ResponsePhp} from "../ResponseHelpers/ResponsePhp";
import {HTMLCreator} from "../HTML/HTMLCreator";

export class UrlLoader {
    private url: string;
    private onFailure: HttpResponseAction = HttpResponseAction.SHOW_USER_MESSAGE;
    private onSuccess: HttpResponseAction = HttpResponseAction.SILENCE_AFTER_ACTION;
    private retryInCaseOfFailure: HttpResponseAction = HttpResponseAction.NO_RETRY;
    private retryTimer: number;
    private readonly headers: JQuery.PlainObject<string> = {};
    private blockUI: boolean = true;

    constructor() {
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    /**
     * The url to call using the {@link callUrl} method
     * @param url
     */
    urlToCall(url: string): UrlLoader {
        this.url = url;
        return this;
    }

    /**
     * Sets what action to be taken in case url fails
     * @param responseAction
     */
    actionOnFailure(responseAction: HttpResponseAction): UrlLoader {
        this.onFailure = responseAction;
        return this;
    }

    /**
     * Sets what action to be taken if fetching url succeeds
     * @param responseAction
     */
    actionOnsuccess(responseAction: HttpResponseAction): UrlLoader {
        this.onSuccess = responseAction;
        return this;
    }

    /**
     * What to do if action fails
     * @param responseAction
     * @param when After how much time in seconds
     */
    retryOnFailure(responseAction: HttpResponseAction, when?: number): UrlLoader {
        this.retryInCaseOfFailure = responseAction;
        this.retryTimer = when * 1000;
        return this;
    }

    blockUIOnCall(block: boolean = true): UrlLoader {
        this.blockUI = block;
        return this;
    }

    /**
     * Fire a fetch command to the url
     */
    async callUrl(): Promise<ResponsePhp> {
        if (!this.url) {
            const htmlCreator = new HTMLCreator();
            htmlCreator.asNewElement()
                .createToast(`No url was set to call!`)
        }

        if (this.blockUI) {
            $('#overlay').fadeIn();
        }

        try {
            const result: ResponsePhp = new ResponsePhp(await $.ajax(this.url, {
                headers: this.headers,
                dataType: 'text'
            }))

            if (this.onSuccess === HttpResponseAction.SHOW_USER_MESSAGE) {
                const htmlCreator = new HTMLCreator();
                htmlCreator.asNewElement()
                    .createToast(`Success! You got your items back!`);
            }

            return result;
        } catch (e) {
            if (this.onFailure === HttpResponseAction.SHOW_USER_MESSAGE) {
                const htmlCreator = new HTMLCreator();
                htmlCreator.asNewElement()
                    .createToast(`Something went wrong while getting your gun model! \n For the developer: `)
            }
        } finally {
            // Unblock ui no matter success or failer
            if (this.blockUI) {
                $('#overlay').fadeOut();
            }
        }
    }

    async callUrlAndParseAsJson<T>() {
        const res = await this.callUrl();
        return res.parseAsJson<T>();
    }
}