import { CartItem } from "../cart/cart-item";

export interface CartPageOptions {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    template: string;
    endpoints: {[key: string]: string};
    templateOptions?: {[key: string]: string};
    beforeCartPageRender?: (cartPageOptions: CartPageOptions, templateOptions: {[key: string]: string}) => void;
    afterCartPageRender?: (cartPageOptions: CartPageOptions, templateOptions: {[key: string]: string}) => void;
    cartFormElement: string;
    onCartFormSubmit: (cartPageOptions: CartPageOptions, event: JQueryEventObject, $this: JQuery) => void;
    cartItemIncrementerElement?: string;
    onCartItemIncrementerElementClicked?: (cartItemQuantityElement, event: JQueryEventObject, $this: JQuery) => void;
    cartItemQuantityElement?: string;
    cartItemDecrementerElement?: string;
    onCartItemDecrementerElementClicked?: (cartItemQuantityElement, event: JQueryEventObject, $this: JQuery) => void;
}