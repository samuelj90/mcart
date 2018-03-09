import { Cart } from "../cart";
import { CartPageOptions } from "./cart-page-options";
import { isNullOrUndefined } from "../utils";
import { defaultCartPageOptions } from "./default-cart-page-options";
import { CartItem } from "../cart/cart-item";
import { Product } from "../product-listing/product";
import *  as ejs from "ejs";
import { RenderToElementNotFound } from "../render-to-element-notfound";

export class CartPage extends Cart {
    private orderModel: any = {
        shippingFormValid: false
    };
    constructor(cartPageOptions: CartPageOptions) {
        super();
        const behaviourSubject = this.getCartItemsSubject();
        const self = this;
        behaviourSubject.subscribe(
            function (cartItems: CartItem[]) {
                self.renderCartItems(cartPageOptions, cartItems);
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
    private renderCartItems(cartPageOptions: CartPageOptions, cartItems: CartItem[]): void {
        try {
            if (cartPageOptions.renderToElement.length <= 0) {
                throw new RenderToElementNotFound(cartPageOptions.renderToElement, "renderToElement of cartpage is not found in DOM");
            }
            cartPageOptions = $.extend({}, defaultCartPageOptions, cartPageOptions);
            if (cartPageOptions.replaceRenderToElementContent) {
                cartPageOptions.renderToElement.html("");
            }
            let subtotal = 0;
            cartItems.forEach((cartItem: CartItem, index: number) => {
                subtotal = subtotal + cartItem.item.price * cartItem.quantity;
            });
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
            let templateData = {
                cartItems: cartItems,
                subtotal: subtotal,
                templateOptions: cartPageOptions.templateOptions
            };
            let template = ejs.compile(cartPageOptions.template)(templateData);
            cartPageOptions.renderToElement.append(template);
            if (!!cartPageOptions.afterCartPageRender) {
                cartPageOptions.afterCartPageRender(cartPageOptions, cartPageOptions.templateOptions);
            }
            if (!!cartPageOptions.cartFormElement) {
                let self = this;
                cartPageOptions.renderToElement.find("form" + cartPageOptions.cartFormElement).on("submit", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    let $this = $(this);
                    cartPageOptions.onCartFormSubmit(cartPageOptions, event, $this);
                });
            }
            let cartRefernce = Cart;
            if (!!cartPageOptions.cartItemIncrementerElement) {
                cartPageOptions.renderToElement.on("click", cartPageOptions.cartItemIncrementerElement, function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    let $this = $(this);
                    let cartItem = $this.data("cartitem") as CartItem;
                    cartPageOptions.onCartItemIncrementerElementClicked(cartPageOptions, cartItem, event, $this);
                });
            }
            if (!!cartPageOptions.cartItemDecrementerElement) {
                cartPageOptions.renderToElement.on("click", cartPageOptions.cartItemDecrementerElement, function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    let $this = $(this);
                    let cartItem = $this.data("cartitem") as CartItem;
                    cartPageOptions.onCartItemDecrementerElementClicked(cartPageOptions, cartItem, event, $this);
                });
            }
            if (!!cartPageOptions.cartItemRemoveElement) {
                cartPageOptions.renderToElement.on("click", cartPageOptions.cartItemRemoveElement, function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    let $this = $(this);
                    let cartItem = $this.data("cartitem") as CartItem;
                    cartPageOptions.onCartItemRemoveElementClicked(cartPageOptions, cartItem, event, $this);
                });
            }
        } catch (error) {
            console.debug(error);
        }
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