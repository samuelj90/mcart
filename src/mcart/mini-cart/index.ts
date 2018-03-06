import { error } from 'util';
import { MiniCartOption } from "./mini-cart-options";
import { isNullOrUndefined } from "../utils";
import { Cart } from "../cart";
import { CartItem } from "../cart/cart-item";
import { Observable } from "rxjs/Observable";
import { defaultMiniCartOption } from "./default-mini-cart-option";
import *  as ejs from "ejs";
/**
 * - Should support multiple minicart on single configuartion
 * - Should have multiple cart items counter and multiple totals
 * - May or maynot have checkout and view cart buttons
 */
export class MiniCart extends Cart {
    private cartItems: CartItem[];

    constructor(private miniCartOptions: MiniCartOption[]) {
        super();
        if (isNullOrUndefined(miniCartOptions) || miniCartOptions.length <= 0) {
            return;
        }
        const behaviourSubject = this.getCartItemsSubject();
        const self = this;
        behaviourSubject.subscribe(
            function (cartItems: CartItem[]) {
                self.renderMiniCartItems(miniCartOptions, cartItems);
                // TODO: Remove unused event bindings.
            },
            function (error) {
                console.error("Error", error);
            },
            function () {
                console.debug("Completed behaviour subject subscription");
            }
        );
    }

    private renderMiniCartItems(miniCartOptions: MiniCartOption[], cartItems: CartItem[]): void {
        miniCartOptions.forEach((miniCartOption: MiniCartOption, index: number, miniCartOptions: MiniCartOption[]) => {
            try {
                if (miniCartOption.renderToElement.length <= 0) {
                    throw new Error(`renderToElement ${miniCartOption.renderToElement},  is not found in DOM`);
                }
                miniCartOption = $.extend({}, defaultMiniCartOption, miniCartOption);
                if (miniCartOption.replaceRenderToElementContent) {
                    miniCartOption.renderToElement.html("");
                }
                let total = 0;
                cartItems.forEach((cartItem: CartItem, index:number) => {
                    total= total + cartItem.item.price* cartItem.quantity
                })
                let templateData = {
                    cartItems: cartItems,
                    total: total
                }
                let template = ejs.compile(miniCartOption.template)(templateData);
                if (!!miniCartOption.triggerElement) {
                    miniCartOption.renderToElement.off('click', miniCartOption.triggerElement);
                }
                if (!!miniCartOption.viewCartElement) {
                    miniCartOption.renderToElement.off('click',miniCartOption.viewCartElement);
                }
                if (!!miniCartOption.proceedToChekcoutElement) {
                    miniCartOption.renderToElement.off('click', miniCartOption.proceedToChekcoutElement);
                }
                if (!!miniCartOption.cartItemRemoveElement) {
                    miniCartOption.renderToElement.off('click', miniCartOption.cartItemRemoveElement);
                }
                miniCartOption.renderToElement.append(template);
                const defaultEventHandler = function(event: JQueryEventObject){
                    event.stopPropagation();
                    let $this: JQuery = $(this);
                    miniCartOption.onTriggerElementClicked(miniCartOption, $this);
                }
                if (!!miniCartOption.triggerElement) {
                    miniCartOption.renderToElement.on('click', miniCartOption.triggerElement, defaultEventHandler);
                }
                if (!!miniCartOption.viewCartElement) {
                    miniCartOption.renderToElement.on('click',miniCartOption.viewCartElement, defaultEventHandler);
                }
                if (!!miniCartOption.proceedToChekcoutElement) {
                    miniCartOption.renderToElement.on('click', miniCartOption.proceedToChekcoutElement, defaultEventHandler);
                }
                if (!!miniCartOption.cartItemRemoveElement) {
                    const removeCartItemEventHandler = function(event: JQueryEventObject){
                        event.stopPropagation();
                        let $this: JQuery = $(this);
                        let cartItem = $(this).data("cartitem") as CartItem;
                        miniCartOption.onCartItemRemoveElementClicked(miniCartOption, cartItem, $this);
                    }
                    miniCartOption.renderToElement.on('click', miniCartOption.cartItemRemoveElement, removeCartItemEventHandler);
                }
            }catch (error) {
                console.error(error);
            }
        });
    }
}