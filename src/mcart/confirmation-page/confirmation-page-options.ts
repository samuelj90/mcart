import { CartItem } from "../cart/cart-item";
import { ShippingDetailsFormModel } from "../cart-page/shipping-details-form-model";

export interface ConfirmationPageOptions {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    template: string;
    endpoints: {[key: string]: string};
    templateOptions?: {[key: string]: string};
}