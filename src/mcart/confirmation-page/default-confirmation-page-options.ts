import { ConfirmationPageOptions } from "./confirmation-page-options";
import { confirmationPageTemplate } from "./confirmation-page-template";

export const defaultConfirmationPageOptions: ConfirmationPageOptions = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: confirmationPageTemplate,
    endpoints: {
        paymentURL: "",
    }
};