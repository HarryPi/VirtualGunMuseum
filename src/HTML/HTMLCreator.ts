import {ColumnModel} from "../BootstrapHelpers/Column.model";
import $ from "jquery";

export class HTMLCreator {
    private html: JQuery<HTMLElement>;

    constructor() {
        this.html = $(`<div></div>`);
    }

    /**
     * Creates a boostrap row
     */
    createBootstrapRow(): HTMLCreator {
        const newEl = $('<div class="row"></div>');
        newEl.appendTo(this.html);
        console.log(this.html);
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

    createBootstrapIdenticalColumns(columnModel: ColumnModel[], extraClass?: string, repeat = 1): HTMLCreator {
        for (let i = 0; i < repeat; i++) {
            this.createBootstrapColumn(columnModel, extraClass);
        }
        return this;
    }

    injectAtColumn(html: HTMLElement | JQuery, col: number): HTMLCreator {
        $(html).appendTo(this.html.find('div.col').get(col));
        return this;
    }

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

    asNewElement() {
        this.html = $(`<div></div>`);
        return this;
    }
}