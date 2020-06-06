import { ICartItem } from "../cart/cart-item";

export interface IMiniCartOption {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    triggerElement: string;
    endpoints: {[key: string]: string};
    viewCartElement?: string;
    proceedToChekcoutElement?: string;
    cartItemRemoveElement?: string;
    wrapperElement?: string;
    template: string;
    onTriggerElementClicked?: (miniCartOption: IMiniCartOption, $this: JQuery) => void;
    onViewCartElementClicked?: (miniCartOption: IMiniCartOption, $this: JQuery) => void;
    onProceedToCheckoutElementClicked?: (miniCartOption: IMiniCartOption, $this: JQuery) => void;
    onCartItemRemoveElementClicked?: (miniCartOption: IMiniCartOption, cartItem: ICartItem, $this: JQuery) => void;
}
