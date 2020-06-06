import { CartItem } from "../cart/cart-item";

export interface MiniCartOption {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    triggerElement: string;
    endpoints: {[key: string]: string};
    viewCartElement?: string;
    proceedToChekcoutElement?: string;
    cartItemRemoveElement?: string;
    wrapperElement?: string;
    template: string;
    onTriggerElementClicked?: (miniCartOption: MiniCartOption, $this: JQuery) => void;
    onViewCartElementClicked?: (miniCartOption: MiniCartOption, $this: JQuery) => void;
    onProceedToCheckoutElementClicked?: (miniCartOption: MiniCartOption, $this: JQuery) => void;
    onCartItemRemoveElementClicked?: (miniCartOption: MiniCartOption, cartItem: CartItem, $this: JQuery) => void;
}