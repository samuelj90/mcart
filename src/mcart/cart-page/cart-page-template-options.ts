import { CartItem } from "../cart/cart-item";

export interface CartPageTemplateOptions {
    template: (templateOptions: CartPageTemplateOptions) => string;
    cartItemTemplate: (templateOptions: CartPageTemplateOptions, cartItem: CartItem, index: number, cartItems: CartItem[]) => string;
    cartItemsFooterTemplate: (templateOptions: CartPageTemplateOptions, cartItems: CartItem[], footerData: any) => string;
    cartItemsContainerId: string;
    cartItemIncrementerElementClass: string;
    cartItemDecrementerElementClass: string;
    cartItemContainerElementId: string;
    checkoutBtnId: string;
    removeItemFromCartBtnElementClass: string;
}