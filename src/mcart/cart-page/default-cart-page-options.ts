import { cartPageTemplate } from "./cart-page-template";
import { CartPageOptions } from "./cart-page-options";

export const defaultCartPageOptions: CartPageOptions = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: cartPageTemplate,
    cartFormElement: "#mcart-cartpage-form",
    endpoints: {
        confirmationPageUrl: "/confirmation.html",
    },
    onCartFormSubmit: (cartPageOptions: CartPageOptions, event: JQueryEventObject, $this: JQuery) => {
        localStorage.setItem("coupondetails", "");
        localStorage.setItem("shippingdetails", "");
        // window.location.href = cartPageOptions.endpoints.confirmationPageUrl;
    }
};