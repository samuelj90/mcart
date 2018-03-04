import { CartItem } from "../cart/cart-item";
import { ShippingDetailsFormModel } from "../cart-page/shipping-details-form-model";

export interface ConfirmationPageOptions {
    renderTo: JQuery;
    replaceRenderToContents: boolean
    templateOptions: ConfirmationPageTemplateOptions
    createOrderURL: string;
}
export interface ConfirmationPageTemplateOptions {
    createOrderURL: string;
    template(templateOptions: ConfirmationPageTemplateOptions)
    cartItemTemplate: (templateOptions: ConfirmationPageTemplateOptions, cartItem: CartItem, index: number, cartItems: CartItem[]) => string;
    cartItemsFooterTemplate: (templateOptions: ConfirmationPageTemplateOptions, cartItems: CartItem[], footerData: any) => string;
    shippingDetailsTemplate: (templateOptions: ConfirmationPageTemplateOptions, shippingDetails) => string;
    couponCodeTemplate: (templateOptions: ConfirmationPageTemplateOptions, couponCodeDetails) => string;
    confirmButtonId: string;
    alertMessageContainerId: string;
    cartItemsContainerId: string;
    cartItemsFooterContainerId: string;
    shippingDetailsContainerId: string;
    couponCodeContainerId: string;
}