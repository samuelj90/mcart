import * as ejs from "ejs";
import { Cart } from "../cart";
import { ICartItem } from "../cart/cart-item";
import { ICartModel } from "../cart/cart-model";
import { Order } from "../order";
import { RenderToElementNotFound } from "../render-to-element-notfound";
import { ICartPageOptions } from "./cart-page-options";
import { defaultCartPageOptions } from "./default-cart-page-options";

export class CartPage {
    constructor(cartPageOptions: ICartPageOptions) {
        const behaviourSubject = Cart.getInstance().getCartModelSubject();
        const self = this;
        behaviourSubject.subscribe(
            (cartModel: ICartModel) => {
                self.renderCartPage(cartPageOptions, cartModel);
                // TODO: Remove unused event bindings.
            },
        );
    }
    private renderCartPage(cartPageOptions: ICartPageOptions, cartModel: ICartModel): void {
        try {
            if (cartPageOptions.renderToElement.length <= 0) {
                throw new RenderToElementNotFound(cartPageOptions.renderToElement, "renderToElement of cartpage is not found in DOM");
            }
            cartPageOptions = $.extend({}, defaultCartPageOptions, cartPageOptions);
            if (cartPageOptions.replaceRenderToElementContent) {
                cartPageOptions.renderToElement.html("");
            }
            if (!!cartPageOptions.cartFormElement) {
                cartPageOptions.renderToElement.off("submit", cartPageOptions.cartFormElement);
            }
            if (!!cartPageOptions.cartItemIncrementerElement) {
                cartPageOptions.renderToElement.off("click", cartPageOptions.cartItemIncrementerElement);
            }
            if (!!cartPageOptions.cartItemDecrementerElement) {
                cartPageOptions.renderToElement.off("click", cartPageOptions.cartItemDecrementerElement);
            }
            if (!!cartPageOptions.cartItemRemoveElement) {
                cartPageOptions.renderToElement.off("click", cartPageOptions.cartItemRemoveElement);
            }
            if (!!cartPageOptions.beforeCartPageRender) {
                cartPageOptions.beforeCartPageRender(cartPageOptions, cartPageOptions.templateOptions);
            }
            const templateData = {
                cartModel,
                templateOptions: cartPageOptions.templateOptions,
            };
            const template = ejs.compile(cartPageOptions.template)(templateData);
            cartPageOptions.renderToElement.append(template);
            if (!!cartPageOptions.afterCartPageRender) {
                cartPageOptions.afterCartPageRender(cartPageOptions, cartPageOptions.templateOptions);
            }
            if (!!cartPageOptions.cartFormElement) {
                cartPageOptions.renderToElement.find("form" + cartPageOptions.cartFormElement).on("submit", (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const $this = $(this);
                    cartPageOptions.onCartFormSubmit(
                        Cart.getInstance(), Order.getInstance(), cartPageOptions, event, $this,
                    );
                });
            }
            if (!!cartPageOptions.cartItemIncrementerElement) {
                cartPageOptions.renderToElement.on("click", cartPageOptions.cartItemIncrementerElement, (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const $this = $(this);
                    const cartItem = $this.data("cartitem") as ICartItem;
                    cartPageOptions.onCartItemIncrementerElementClicked(
                        Cart.getInstance(), cartPageOptions, cartItem, event, $this,
                    );
                });
            }
            if (!!cartPageOptions.cartItemDecrementerElement) {
                cartPageOptions.renderToElement.on("click", cartPageOptions.cartItemDecrementerElement, (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const $this = $(this);
                    const cartItem = $this.data("cartitem") as ICartItem;
                    cartPageOptions.onCartItemDecrementerElementClicked(
                        Cart.getInstance(), cartPageOptions, cartItem, event, $this,
                    );
                });
            }
            if (!!cartPageOptions.cartItemRemoveElement) {
                cartPageOptions.renderToElement.on("click", cartPageOptions.cartItemRemoveElement, (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const $this = $(this);
                    const cartItem = $this.data("cartitem") as ICartItem;
                    cartPageOptions.onCartItemRemoveElementClicked(
                        Cart.getInstance(), cartPageOptions, cartItem, event, $this,
                    );
                });
            }
            // tslint:disable-next-line:no-empty
        } finally { }
    }
    /* private serializeFormData($form): any {
        let formData = {};
        let formArray = $form.serializeArray();
        $.each(formArray, function() {
            if (formData[this.name]) {
                if (!formData[this.name].push) {
                    formData[this.name] = [formData[this.name]];
                }
                formData[this.name].push(this.value || "");
            } else {
                formData[this.name] = this.value || "";
            }
        });
        return formData;
    } */
}
