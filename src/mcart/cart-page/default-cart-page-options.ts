import { isNullOrUndefined } from "util";
import { cartPageTemplate } from "./cart-page-template";
import { CartPageOptions } from "./cart-page-options";
import { Cart } from "../cart";
import { CartItem } from "../cart/cart-item";
import { Product } from "../product-listing/product";
import { Order } from "../order";
import { OrderStatus } from "../order/order-status";

export const defaultCartPageOptions: CartPageOptions = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: cartPageTemplate,
    cartFormElement: "#mcart-cartpage-form",
    endpoints: {
        confirmationPageUrl: "/confirmation.html",
        createOrderURL: "/api/order/create"
    },
    templateOptions: {},
    beforeCartPageRender: function (cartPageOptions: CartPageOptions, templateOptions: { [key: string]: any }) {
        templateOptions.shippingFormSubmitBtn = "mcart-cartpage-updateshipping";
        cartPageOptions.renderToElement.off("click", "#" + templateOptions.couponFormSubmitBtn);
        templateOptions.couponFormSubmitBtn = "mcart-cartpage-updatecouponcode";
        cartPageOptions.renderToElement.off("click", "#" + templateOptions.couponFormSubmitBtn);
    },
    afterCartPageRender: function (cartPageOptions: CartPageOptions, templateOptions: { [key: string]: string }) {
        cartPageOptions.renderToElement.on("click", "#" + templateOptions.shippingFormSubmitBtn, function(event){
            event.preventDefault();
            event.stopPropagation();
            cartPageOptions.renderToElement.find("#mcart-cartpage-shippingform").find("input, select, textarea").each(function(index: number, elem: Element){
                console.log($(elem).val());
            });
         });
         cartPageOptions.renderToElement.on("click", "#" + templateOptions.couponFormSubmitBtn, function(event){
            event.preventDefault();
            event.stopPropagation();
         });
    },
    onCartFormSubmit: function (cartPageOptions: CartPageOptions, event: JQueryEventObject, $this: JQuery) {
        let cartModel = Cart.getInstance().getCartModelSubject().value;
        let cartItems = cartModel.cartItems.map(function(cartItem) { return {id: cartItem.item.id, quantity: cartItem.quantity}; });
        console.log(cartItems);
        console.log(cartModel.shippingDetails);
        console.log(cartModel.couponDetails);
        let data = {
            cartItems: cartItems,
            shippingDetails: cartModel.shippingDetails,
            couponDetails: cartModel.couponDetails
        };
        $.ajax({
            url: cartPageOptions.endpoints.createOrderURL,
            method: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {
                let orderInstance  = Order.getInstance();
                orderInstance.orderId = data.orderId;
                orderInstance.orderStatus = OrderStatus.Created;
                orderInstance.orderItems = data.orderItems;
                orderInstance.shippingDetails = data.shippingDetails;
                orderInstance.couponDetails = data.couponDetails;
                orderInstance.taxAmount = data.taxAmount;
                console.log((orderInstance));
                localStorage.setItem(orderInstance.ORDER_LOCAL_STORAGE_KEY, JSON.stringify(orderInstance));
                window.location.href = cartPageOptions.endpoints.confirmationPageUrl;
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    },
    cartItemIncrementerElement: ".mcart-cartpage-cartitem-incrementer",
    onCartItemIncrementerElementClicked: function (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        let product: Product = cartItem.item;
        Cart.getInstance().insertProductToCart(product, 1);
    },
    cartItemDecrementerElement: ".mcart-cartpage-cartitem-decrementer",
    onCartItemDecrementerElementClicked: function (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        let product: Product = cartItem.item;
        Cart.getInstance().removeProductFromCart(product, 1);
    },
    cartItemRemoveElement: ".mcart-cartpage-cartitem-remove",
    onCartItemRemoveElementClicked: function (cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        Cart.getInstance().removeCartItemFromCart(cartItem);
    }
};