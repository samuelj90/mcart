import { Cart } from "../cart";
import { CartPageOptions } from "./cart-page-options";
import { isNullOrUndefined } from "../utils";
import { defaultCartPageOptions } from "./default-cart-page-options";
import { CartItem } from "../cart/cart-item";
import { Product } from "../product-listing/product";
import *  as ejs from "ejs";

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
                throw new Error(`renderToElement ${cartPageOptions.renderToElement},  is not found in DOM`);
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
        } catch (error) {
            console.error(error);
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