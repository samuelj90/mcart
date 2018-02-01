import { MiniCartOptions } from "./mini-cart-options";
import { isNullOrUndefined } from "../utils";
import { Cart } from "../cart";
import { CartItem } from "../cart/cart-item";
import { Observable } from "rxjs/Observable";
import { defaultMiniCartOptions } from "./default-mini-cart-options";
export class MiniCart extends Cart {
    private cartItems: CartItem[];

    constructor(private miniCartOptions: MiniCartOptions) {
        super();
        if (isNullOrUndefined(miniCartOptions)) {
            return;
        }
        miniCartOptions = $.extend({}, defaultMiniCartOptions, miniCartOptions);
        this.initializeMiniCart(miniCartOptions);
        const behaviourSubject = this.getCartItemsSubject();
        const self = this;
        behaviourSubject.subscribe(
            function (cartItems: CartItem[]) {
                console.debug("cartItems >> ", cartItems)
                self.renderMiniCartItems(miniCartOptions, cartItems);
            },
            function (error) {
                console.log("Error", error);
            },
            function () {
                console.debug("Completed");
            }
        );
        console.log(behaviourSubject.observers);
    }

    private initializeMiniCart(miniCartOptions: MiniCartOptions): void {
        if (miniCartOptions.replaceRenderToContents) {
            miniCartOptions.renderTo.html("");
        }
        let templateOptions = miniCartOptions.templateOptions;
        let template = templateOptions.template(templateOptions, 0);
        miniCartOptions.renderTo.append(template);
    }

    private renderMiniCartItems(miniCartOptions: MiniCartOptions, cartItems: CartItem[]): any {
        let templateOptions = miniCartOptions.templateOptions;
        let cartItemsContainer  = $("#" + templateOptions.cartItemsContainerId);
        cartItemsContainer.html("");
        cartItems.forEach((cartItem: CartItem, index: number, cartItems: CartItem[]) => {
            let template = templateOptions.cartItemTemplate(templateOptions, cartItem, index, cartItems);
            cartItemsContainer.append(template)
        });
    }
    // TODO create observer subscriber pattern for linkBtn CartItemsCount
}