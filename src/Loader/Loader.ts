export class LoaderCreator {

    private kind: LoaderKind

    constructor(kind = LoaderKind.FACEBOOK_STYLE) {
        this.kind = kind;
    }

    createLoaderDiv(kind?: LoaderKind): JQuery {
        if (!kind) {
            kind = this.kind;
        }
        switch (kind) {
            case LoaderKind.ANDROID_LIKE:
                return this.createAndroidSyle();
            case LoaderKind.FACEBOOK_STYLE:
                return this.createFbStyle();
            case LoaderKind.GRID:
                return this.createGrid();
            default:
                return this.createGrid();
        }
    }

    private createGrid(): JQuery {
        return $('<div class="lds-grid d-flex mat-elevation-z2 justify-content-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
    }

    private createFbStyle(): JQuery {
        return $('<div class="lds-facebook mat-elevation-z2"><div></div><div></div><div></div></div>');
    }

    private createAndroidSyle() {
        return $('<div class="lds-default mat-elevation-z2"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
    }

}

export enum LoaderStyle {
    AS_CARD = 'CARD'
}

export enum LoaderKind {
    GRID = 'lds-grid',
    FACEBOOK_STYLE = 'lds-facebook',
    ANDROID_LIKE = 'lds-default'
}