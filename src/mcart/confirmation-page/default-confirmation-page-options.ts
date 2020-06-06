import { ConfirmationPageOptions } from "./confirmation-page-options";
import { confirmationPageTemplate } from "./confirmation-page-template";

export const defaultConfirmationPageOptions: ConfirmationPageOptions = {
    endpoints: {
        getOrderModelURL: "/api/order/",
        noOrderReturnURL: "/",
        paymentURL: "",
    },
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: confirmationPageTemplate,
};
