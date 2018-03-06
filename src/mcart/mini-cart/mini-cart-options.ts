import { CartItem } from "../cart/cart-item";
import { Cart } from "../cart";

export interface MiniCartOptions {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    triggerElement: JQuery;
    cartItemsCounterElement: JQuery;
    viewCartElement: JQuery;
    proceedToChekcoutElement: JQuery;
    cartItemRemoveElement: JQuery;
    template: string;
    onTriggerElementClicked?: (miniCartOptions: MiniCartOptions, $this: JQuery) => void;
    onViewCartElementClicked?: (miniCartOptions: MiniCartOptions, $this: JQuery) => void;
    onProceedToCheckoutElementClicked?: (miniCartOptions: MiniCartOptions, $this: JQuery) => void;
    onCartItemRemoveElementClicked?: (miniCartOptions: MiniCartOptions, cartItem: CartItem, $this: JQuery) => void;
}