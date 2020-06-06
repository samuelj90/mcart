import { CartItem } from "../cart/cart-item";
import { Cart } from "../cart";
import { Order } from "../order";

export interface CartPageOptions {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    template: string;
    endpoints: {[key: string]: string};
    templateOptions?: {[key: string]: any};
    beforeCartPageRender?: (cartPageOptions: CartPageOptions, templateOptions: {[key: string]: string}) => void;
    afterCartPageRender?: (cartPageOptions: CartPageOptions, templateOptions: {[key: string]: string}) => void;
    cartFormElement: string;
    onCartFormSubmit: (Cart: Cart, Order: Order, cartPageOptions: CartPageOptions, event: JQueryEventObject, $this: JQuery) => void;
    cartItemIncrementerElement?: string;
    onCartItemIncrementerElementClicked?: (Cart: Cart, cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) => void;
    cartItemDecrementerElement?: string;
    onCartItemDecrementerElementClicked?: (Cart: Cart, cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) => void;
    cartItemRemoveElement?: string;
    onCartItemRemoveElementClicked?: (Cart: Cart, cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) => void;
}