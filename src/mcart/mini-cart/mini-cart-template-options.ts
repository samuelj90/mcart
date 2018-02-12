import { CartItem } from "../cart/cart-item";

export interface MiniCartTemplateOptions {
    linkBtnCounterElementId: string;
    linkBtnId: string;
    viewCartBtnEnabled: boolean;
    viewCartBtnId: string;
    viewCartBtnLabel: string;
    proceedToCheckoutEnabled: boolean;
    proceedToCheckoutBtnId: string;
    proceedToCheckoutBtnLabel: string;
    prependCurrency: boolean;
    quantityLabel: string;
    cartItemsContainerId: string;
    removeItemFromCartBtnElementClass: string;
    cartItemsFooterId: string;
    cartItemsSubTotalContainerId: string;
    cartItemsSubTotalLabel: string;
    displayCarQtyInlinkBtnCounter: boolean;
    template?: (miniCartTemplateOptions: MiniCartTemplateOptions, cartItemsCount: number) => string;
    cartItemsFooterTemplate?: (miniCartTemplateOptions: MiniCartTemplateOptions, subTotal: number) => string;
    cartItemTemplate?: (miniCartOptions: MiniCartTemplateOptions, cartItem: CartItem, index: number, cartItems: CartItem[]) => string;
}