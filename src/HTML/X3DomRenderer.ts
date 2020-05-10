declare var x3dom: any;

export class X3DomRenderer {
    constructor() {
    }

    public static createInline(url: string, namespace: string, withClass?: string): JQuery {
        return $(`        
        <X3D class="${withClass}" xmlns="http://www.web3d.org/specifications/x3d-namespace">
            <Scene>
                <Inline nameSpaceName="${namespace}" mapDEFToID="true" url="${url}"/>
            </Scene>
        </X3D>
            `)
    }

    public static createInlineAsCard(url: string, namespace: string): JQuery {
        const toCreate = $(`            
            <div class="card">
                <div class="card-img-top" id="__inline_placeholder__">
                </div>
                <div class="card-body">
                    
                </div>
            </div>`);
            toCreate.find('#__inline_placeholder__')
            .append(X3DomRenderer.createInline(url, namespace, 'card-img-top'));
            return toCreate;
    }
}