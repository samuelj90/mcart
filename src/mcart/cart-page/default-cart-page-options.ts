import { cartPageTemplate } from "./cart-page-template";
import { CartPageOptions } from "./cart-page-options";
import { Cart } from "../cart";
import { CartItem } from "../cart/cart-item";
import { Product } from "../product-listing/product";

export const defaultCartPageOptions: CartPageOptions = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: cartPageTemplate,
    cartFormElement: "#mcart-cartpage-form",
    endpoints: {
        confirmationPageUrl: "/confirmation.html",
    },
    afterCartPageRender: function (cartPageOptions: CartPageOptions, templateOptions: { [key: string]: string }) {
    },
    onCartFormSubmit: function (cartPageOptions: CartPageOptions, event: JQueryEventObject, $this: JQuery) {
        localStorage.setItem("coupondetails", "");
        localStorage.setItem("shippingdetails", "");
        localStorage.setItem("cartItems", "");
        cartPageOptions.renderToElement.find("input, select, textarea").attr("readonly", "readonly");
        // window.location.href = cartPageOptions.endpoints.confirmationPageUrl;
    },
    cartItemIncrementerElement: ".mcart-cartpage-cartitem-incrementer",
    onCartItemIncrementerElementClicked: function (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        let product: Product = cartItem.item;
        Cart.insertProductToCart(product, 1);
    },
    cartItemDecrementerElement: ".mcart-cartpage-cartitem-decrementer",
    onCartItemDecrementerElementClicked: function (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        let product: Product = cartItem.item;
        Cart.removeProductFromCart(product, 1);
    },
    cartItemRemoveElement: ".mcart-cartpage-cartitem-remove",
    onCartItemRemoveElementClicked: function (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        Cart.removeCartItemFromCart(cartItem);
    }
};