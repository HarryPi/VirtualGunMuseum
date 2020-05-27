import {HtmlRenderer, Parser} from 'commonmark';

export class Markdown {
    private _parser: Parser;
    private _htmlRenderer: HtmlRenderer;

    constructor() {
        this._parser = new Parser();
        this._htmlRenderer = new HtmlRenderer();
    }

    /**
     * Converts a markdown string into HTML
     * @param markdown
     */
    convertMarkdownToHTML(markdown: string) {
        const parsed = this._parser.parse(markdown);

        return this._htmlRenderer.render(parsed);
    }
}