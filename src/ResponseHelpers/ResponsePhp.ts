export class ResponsePhp {
    private _response: JQueryXHR;
    private _responseText: string;

    constructor(response: JQueryXHR) {
        this._response = response;
    }

    /**
     * PHP returns the index as well as the data,
     * we do not need that as we inject our data dynamically
     * Strip the HTML and keep a JSON format String
     */
    async fromPhpToJsonFormatString(): Promise<ResponsePhp> {
        let responseText;
        if (typeof this._response === "object") {
            responseText = this._response.responseText;
        } else {
            responseText = this._response;
        }
        let indexToRemoveFrom: number = responseText.indexOf('<!DOCTYPE html>');
        let newText: string = responseText.slice(0, indexToRemoveFrom);
        this._responseText = newText;

        return this;
    }

    async parseAsJson<T>(): Promise<T> {
        if (this._responseText) {
            return JSON.parse(this.responseText) as T;
        }

        await this.fromPhpToJsonFormatString();
        return JSON.parse(this.responseText) as T;
    }

    /**
     * @description
     * Returns if the http response has resolved successfully
     * @deprecated Use await async instead with throw catch block
     */
    ok(): boolean {
        return this._response.state() === "resolved";
    }

    get responseText(): string {
        return this._responseText;
    }
}