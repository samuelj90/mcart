import { CartItem } from "../cart/cart-item";
import { Cart } from "../cart";

export interface MiniCartOption {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    triggerElement: string;
    viewCartElement?: string;
    proceedToChekcoutElement?: string;
    cartItemRemoveElement?: string;
    template: string;
    onTriggerElementClicked?: (miniCartOption: MiniCartOption, $this: JQuery) => void;
    onViewCartElementClicked?: (miniCartOption: MiniCartOption, $this: JQuery) => void;
    onProceedToCheckoutElementClicked?: (miniCartOption: MiniCartOption, $this: JQuery) => void;
    onCartItemRemoveElementClicked?: (miniCartOption: MiniCartOption, cartItem: CartItem, $this: JQuery) => void;
}