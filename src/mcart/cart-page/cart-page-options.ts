import { Cart } from "../cart";
import { ICartItem } from "../cart/cart-item";
import { Order } from "../order";

export interface ICartPageOptions {
    cartItemDecrementerElement?: string;
    cartItemIncrementerElement?: string;
    cartItemRemoveElement?: string;
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    template: string;
    endpoints: { [key: string]: string };
    templateOptions?: { [key: string]: any };
    beforeCartPageRender?: (cartPageOptions: ICartPageOptions, templateOptions: { [key: string]: string }) => void;
    afterCartPageRender?: (cartPageOptions: ICartPageOptions, templateOptions: { [key: string]: string }) => void;
    cartFormElement: string;
    onCartFormSubmit: (
        Cart: Cart, Order: Order, cartPageOptions: ICartPageOptions, event: JQueryEventObject, $this: JQuery,
    ) => void;
    onCartItemIncrementerElementClicked?: (
        Cart: Cart, cartPageOptions: ICartPageOptions, cartItem: ICartItem, event: JQueryEventObject, $this: JQuery,
    ) => void;
    onCartItemDecrementerElementClicked?: (
        Cart: Cart, cartPageOptions: ICartPageOptions, cartItem: ICartItem, event: JQueryEventObject, $this: JQuery,
    ) => void;
    onCartItemRemoveElementClicked?: (
        Cart: Cart, cartPageOptions: ICartPageOptions, cartItem: ICartItem, event: JQueryEventObject, $this: JQuery,
    ) => void;
}
