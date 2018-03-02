export interface ConfirmationPageOptions {
    renderTo: JQuery;
    replaceRenderToContents: boolean
    templateOptions: ConfirmationPageTemplateOptions,
    createOrderURL: string;
}
export interface ConfirmationPageTemplateOptions {
    template(templateOptions: ConfirmationPageTemplateOptions, cartpageModel)
    confirmButtonId: string;
    alertMessageContainerId: string;
}