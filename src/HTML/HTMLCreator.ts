import {ColumnModel} from "../BootstrapHelpers/Column.model";
import $ from "jquery";

export class HTMLCreator {
    private static allInjected = [];
    private html: JQuery<HTMLElement>;

    constructor() {
        this.html = $(`<div class="auto-generated"></div>`);
    }

    /**
     * Creates a boostrap row
     */
    createBootstrapRow(): HTMLCreator {
        const newEl = $('<div class="row"></div>');
        newEl.appendTo(this.html.attr('class', 'auto-generated'));
        return this;
    }

    /**
     * Creates a bootstrap column and appends it on ALL bootstrap rows created
     * empty if no rows exist
     * @param columnModel
     * @param extraClass
     */
    createBootstrapColumn(columnModel: ColumnModel[], extraClass?: string): HTMLCreator {
        const newEl = $(`<div class="${ColumnModel.getAsClass(columnModel)} col ${extraClass}"></div>`)
        newEl.appendTo(this.html.find('div.row'));
        return this;
    }

    /**
     * Repeast a call at {@link createBootstrapColumn} for repeat times
     * @param columnModel The column model for breakpoints
     * @param extraClass Any aditional classes to apply
     * @param repeat How many times to repeat
     */
    createBootstrapIdenticalColumns(columnModel: ColumnModel[], extraClass?: string, repeat = 1): HTMLCreator {
        for (let i = 0; i < repeat; i++) {
            this.createBootstrapColumn(columnModel, extraClass);
        }
        return this;
    }

    /**
     * Injects an HTML Element at gird column indicated by the index param
     * @param html Element to inject
     * @param col Column index
     */
    injectAtColumn(html: HTMLElement | JQuery, col: number): HTMLCreator {
        $(html).appendTo(this.html.find('div.col').get(col));
        return this;
    }

    /**
     * Injects the same HTML Element at all the grid columns
     * @param html HTML Element to be injected
     */
    injectAtAllColumns(html: HTMLElement | JQuery): HTMLCreator {
        $(html).appendTo(this.html.find('div.col'));
        return this;
    }

    /**
     * Injects the content at location and flushes the HTML stream
     * @param where Id of where to dump the HTML
     */
    injectCreatedContentAt(where: HTMLElement | JQuery): void {
        this.html.appendTo(where);
        this.asNewElement();
    }

    /**
     * Injects the content at location and flushes the HTML stream.
     * Will also clear all content in passed element before injecting
     * @param where Id of where to dump the HTML
     */
    injectCreatedConantAndClear(where: HTMLElement | JQuery): void {
        $(where).empty();
        this.injectCreatedContentAt(where);
    }

    /**
     * Creates a hidden modal
     * @param idForModal
     * @param idForTitle
     * @param idForContent
     */
    createModal(idForModal: string, idForTitle?: string, idForContent?: string): HTMLCreator {
        $(`
        <div class="modal fade" id="${idForModal}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${idForTitle}"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="${idForContent}">
                    </div>
                </div>
            </div>
        </div>
                `).appendTo(this.html);
        return this;
    }

    /**
     * Discards the old inner HTML
     * But does not clear it!
     */
    asNewElement() {
        this.html = $(`<div></div>`);
        return this;
    }

    /**
     * WARNING - Will clear ALL Created content
     */
    public static clearCreatedContent() {
        $(document).find('.auto-generated')
            .toArray()
            .forEach((item: HTMLElement) => {
                $(item).empty();
            })
    }
}