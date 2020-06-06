import * as ejs from "ejs";
import { Cart } from "../cart";
import { ICartItem } from "../cart/cart-item";
import { ICartModel } from "./../cart/cart-model";
import { defaultMiniCartOption } from "./default-mini-cart-option";
import { IMiniCartOption } from "./mini-cart-options";
/**
 * - Should support multiple minicart on single configuartion
 * - Should have multiple cart items counter and multiple totals
 * - May or maynot have checkout and view cart buttons
 */
export class MiniCart {
    private cartItems: ICartItem[];

    constructor(private miniCartOptions: IMiniCartOption[]) {
        const behaviourSubject = Cart.getInstance().getCartModelSubject();
        const self = this;
        behaviourSubject.subscribe(
            (cartModel: ICartModel) => {
                self.renderMiniCart(miniCartOptions, cartModel);
                // TODO: Remove unused event bindings.
            },
        );
    }

    private renderMiniCart(miniCartOptions: IMiniCartOption[], cartModel: ICartModel): void {
        miniCartOptions.forEach((miniCartOption: IMiniCartOption, index: number) => {
            try {
                if (miniCartOption.renderToElement.length <= 0) {
                    throw new Error(`renderToElement ${miniCartOption.renderToElement},  is not found in DOM`);
                }
                miniCartOption = $.extend({}, defaultMiniCartOption, miniCartOption);
                if (miniCartOption.replaceRenderToElementContent) {
                    miniCartOption.renderToElement.html("");
                }
                const templateData = {
                    cartModel,
                };
                const template = ejs.compile(miniCartOption.template)(templateData);
                if (!!miniCartOption.triggerElement) {
                    miniCartOption.renderToElement.off("click", miniCartOption.triggerElement);
                }
                if (!!miniCartOption.viewCartElement) {
                    miniCartOption.renderToElement.off("click", miniCartOption.viewCartElement);
                }
                if (!!miniCartOption.proceedToChekcoutElement) {
                    miniCartOption.renderToElement.off("click", miniCartOption.proceedToChekcoutElement);
                }
                if (!!miniCartOption.cartItemRemoveElement) {
                    miniCartOption.renderToElement.off("click", miniCartOption.cartItemRemoveElement);
                }
                miniCartOption.renderToElement.append(template);
                if (!!miniCartOption.triggerElement) {
                    miniCartOption.renderToElement.on(
                        "click", miniCartOption.triggerElement, (event: JQueryEventObject) => {
                            event.stopPropagation();
                            const $this: JQuery = $(this);
                            miniCartOption.onTriggerElementClicked(miniCartOption, $this);
                        });
                }
                if (!!miniCartOption.viewCartElement) {
                    miniCartOption.renderToElement.on(
                        "click", miniCartOption.viewCartElement, (event: JQueryEventObject) => {
                            event.stopPropagation();
                            const $this: JQuery = $(this);
                            miniCartOption.onViewCartElementClicked(miniCartOption, $this);
                        });
                }
                if (!!miniCartOption.proceedToChekcoutElement) {
                    miniCartOption.renderToElement.on(
                        "click", miniCartOption.proceedToChekcoutElement, (event: JQueryEventObject) => {
                            event.stopPropagation();
                            const $this: JQuery = $(this);
                            miniCartOption.onProceedToCheckoutElementClicked(miniCartOption, $this);
                        });
                }
                if (!!miniCartOption.cartItemRemoveElement) {
                    const removeCartItemEventHandler = (event: JQueryEventObject) => {
                        event.stopPropagation();
                        const $this: JQuery = $(this);
                        const cartItem = $(this).data("cartitem") as ICartItem;
                        miniCartOption.onCartItemRemoveElementClicked(miniCartOption, cartItem, $this);
                    };
                    miniCartOption.renderToElement.on(
                        "click", miniCartOption.cartItemRemoveElement, removeCartItemEventHandler);
                }
            // tslint:disable-next-line:no-empty
            } finally {}
        });
    }
}
