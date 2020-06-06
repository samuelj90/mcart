export interface ConfirmationPageOptions {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    template: string;
    endpoints: {[key: string]: string};
    templateOptions?: {[key: string]: string};
}