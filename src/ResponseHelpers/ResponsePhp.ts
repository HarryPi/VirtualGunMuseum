export class ResponsePhp {
    private response: Response;
    constructor(response: Response) {
        this.response = response;
    }

    /**
     * PHP returns the index as well as the data,
     * we do not need that as we inject our data dynamically
     * Strip the HTML and keep a JSON format String
     */
    async fromPhpToJsonFormatString(): Promise<string> {
        if (!this.response.ok) {
            return null;
        }
        let responseText: string = await this.response.text();
        let indexToRemoveFrom: number = responseText.indexOf('<!DOCTYPE html>');
        let newText: string = responseText.slice(0, indexToRemoveFrom);
        return newText;
    }

    ok(): boolean {
        return this.response.ok;
    }
}