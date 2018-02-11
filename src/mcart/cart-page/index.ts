import { Cart } from "../cart";
import { CartPageOptions } from "./cart-page-options";
import { isNullOrUndefined } from "../utils";
import { defaultCartPageOptions } from "./default-cart-page-options";
import { CartItem } from "../cart/cart-item";

export class CartPage extends Cart {

    constructor(cartPageOptions: CartPageOptions) {
        super();
        if (isNullOrUndefined(cartPageOptions)) {
            return;
        }
        cartPageOptions = $.extend({}, defaultCartPageOptions, cartPageOptions);
        this.initializeCartPage(cartPageOptions);
        const behaviourSubject = this.getCartItemsSubject();
        const self = this;
        behaviourSubject.subscribe(
            function (cartItems: CartItem[]) {
                console.debug("cartItems >> ", cartItems)
                self.renderCartPage(cartPageOptions, cartItems);
            },
            function (error) {
                console.log("Error", error);
            },
            function () {
                console.debug("Completed");
            }
        );
        this.initializeEventListerners(cartPageOptions);
        console.log(behaviourSubject.observers);
    }
    initializeCartPage(cartPageOptions: CartPageOptions): void {
        if (cartPageOptions.replaceRenderToContents) {
            cartPageOptions.renderTo.html("");
        }
        let templateOptions = cartPageOptions.templateOptions;
        let template = templateOptions.template(templateOptions);
        cartPageOptions.renderTo.append(template);
    }
    renderCartPage(cartPageOptions: CartPageOptions, cartItems: CartItem[]): void {
        throw new Error("Method not implemented.");
    }
    initializeEventListerners(cartPageOptions: CartPageOptions): void {
        throw new Error("Method not implemented.");
    }
}