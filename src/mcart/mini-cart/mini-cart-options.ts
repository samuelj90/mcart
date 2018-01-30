import { CartItem } from "../cart/cart-item";

export interface MiniCartOptions {
    linkBtnId: string;
    onLinkBtnClicked: () => void;
    template: (miniCartOptions: MiniCartOptions, cartItemsCount: number) => string;
    cartItemTemplate: (miniCartOptions: MiniCartOptions, cartItem: CartItem, index: number, cartItems: CartItem[]) => string;
    appendElement?: JQuery;
    linkBtnCounterSelector: string;
    viewCartBtnEnabled?: boolean;
    viewCartBtnClass?: string;
    onViewCartBtnClicked: () => void;
    proceedToCheckoutEnabled?: boolean;
    proceedToCheckoutBtnClass?: string;
    onProceedToCheckoutBtnClicked: () => void;
}