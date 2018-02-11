import { CartItem } from "../cart/cart-item";

export interface CartPageTemplateOptions {
    template: (templateOptions: CartPageTemplateOptions) => string;
    cartItemTemplate: (templateOptions: CartPageTemplateOptions, cartItem: CartItem) => string;
    cartItemFooterTemplate: (templateOptions: CartPageTemplateOptions, cartItems: CartItem[]) => string;
    cartItemIncrementerElementClass: string;
    cartItemDecrementerElementClass: string;
    cartItemContainerElementId: string;
    checkoutBtnId: string;
}