import { CartItem } from "../cart/cart-item";
import { ShippingDetailsFormModel } from "./shipping-details-form-model";

export interface CartPageTemplateOptions {
    template: (templateOptions: CartPageTemplateOptions) => string;
    cartItemTemplate: (templateOptions: CartPageTemplateOptions, cartItem: CartItem, index: number, cartItems: CartItem[]) => string;
    cartItemsFooterTemplate: (templateOptions: CartPageTemplateOptions, cartItems: CartItem[], footerData: any) => string;
    shippingDetailsFormTemplate: (templateOptions: CartPageTemplateOptions, shippingDetailsFormModel: ShippingDetailsFormModel) => string;
    couponCodeFormTemplate: (templateOptions: CartPageTemplateOptions) => string;
    cartItemsContainerId: string;
    cartItemIncrementerElementClass: string;
    cartItemDecrementerElementClass: string;
    checkoutBtnId: string;
    removeItemFromCartBtnElementClass: string;
    cartItemsFooterContainerId: string;
    shippingDetailsFormContainerId: string;
    shippingDetailsFormElemtnId: string;
    shippingDetailsFormCountryElemtnId: string;
    shippingDetailsFormStateElemtnId: string;
    alertMessageContainerId: string;
    couponCodeFormContainerId: string;
    couponCodeFormElemtnId: string;
}