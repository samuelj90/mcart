import { CartItem } from "../cart/cart-item";
import { Cart } from "../cart";

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
    onCartItemIncrementerElementClicked?: (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) => void;
    cartItemDecrementerElement?: string;
    onCartItemDecrementerElementClicked?: (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) => void;
    cartItemRemoveElement?: string;
    onCartItemRemoveElementClicked?: (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) => void;
}