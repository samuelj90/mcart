import { states } from "./../shared/states";
import { countries } from "./../shared/countries";
import { isNullOrUndefined } from "util";
import { cartPageTemplate } from "./cart-page-template";
import { CartPageOptions } from "./cart-page-options";
import { Cart } from "../cart";
import { CartItem } from "../cart/cart-item";
import { Product } from "../product-listing/product";
import { Order } from "../order";
import { OrderStatus } from "../order/order-status";
import *  as ejs from "ejs";
import { selectOptionTemplate } from "./select-options-template";
import { OrderModel } from "../order/order-model";

declare let window: any;

export const defaultCartPageOptions: CartPageOptions = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: cartPageTemplate,
    cartFormElement: "#mcart-cartpage-form",
    endpoints: {
        confirmationPageUrl: "/confirmation.html",
        createOrderURL: "/api/order/"
    },
    templateOptions: {},
    beforeCartPageRender: function (cartPageOptions: CartPageOptions, templateOptions: { [key: string]: any }) {
        templateOptions.shippingFormSubmitBtn = "mcart-cartpage-updateshipping";
        cartPageOptions.renderToElement.off("click", "#" + templateOptions.shippingFormSubmitBtn);
        templateOptions.couponFormSubmitBtn = "mcart-cartpage-updatecouponcode";
        cartPageOptions.renderToElement.off("click", "#" + templateOptions.couponFormSubmitBtn);
        templateOptions.shippingFormElementId = "mcart-cartpage-shippingform";
        templateOptions.couponDetailsFormElementId = "mcart-cartpage-coupondetailsform";
        templateOptions.countries = countries;
        templateOptions.states = states;
        templateOptions.shippingCountrySelectId = "mcart-shippingdetails-countryselect";
        templateOptions.shippingStateSelectId = "mcart-shippingdetails-stateselect";
    },
    afterCartPageRender: function (cartPageOptions: CartPageOptions, templateOptions: { [key: string]: string }) {
        cartPageOptions.renderToElement.on("click", "#" + templateOptions.shippingFormSubmitBtn, function(event) {
            event.preventDefault();
            event.stopPropagation();
            let shippingDetails = {};
            cartPageOptions.renderToElement.find("#" + templateOptions.shippingFormElementId).find("input, select, textarea").each(function(index: number, elem: Element){
                shippingDetails[$(this).attr("name")] = $(this).val();
            });
            console.log(shippingDetails);
            Cart.getInstance().setShippingDetails(shippingDetails);
         });
         cartPageOptions.renderToElement.on("click", "#" + templateOptions.couponFormSubmitBtn, function(event) {
            event.preventDefault();
            event.stopPropagation();
            let couponDetails = {};
            cartPageOptions.renderToElement.find("#" + templateOptions.couponDetailsFormElementId).find("input").each(function(index: number, elem: Element){
                couponDetails[$(this).attr("name")] = $(this).val();
            });
            Cart.getInstance().setCouponDetails(couponDetails);
         });
         cartPageOptions.renderToElement.on("change", "#" + templateOptions.shippingCountrySelectId, function(event) {
            let selectedCountry = $(this).find("option:selected").data("selectedoption");
            let correspondingStates =  states.filter((state) => {
                return state.country_id === selectedCountry.id;
            });
            let templateData = {
                options: correspondingStates,
                selectedOption: null
            };
            let template = ejs.compile(selectOptionTemplate)(templateData);
            cartPageOptions.renderToElement.find("#" + templateOptions.shippingStateSelectId).html(template);

         });
         cartPageOptions.renderToElement.on("change", "#" + templateOptions.shippingStateSelectId, function(event) {
            let selectedState = $(this).find("options:selected").data("selectedoption");
         });
    },
    onCartFormSubmit: function (Cart:Cart, Order:Order, cartPageOptions: CartPageOptions, event: JQueryEventObject, $this: JQuery) {
        let cartModel = Cart.getCartModelSubject().value;
        let cartItems = cartModel.cartItems.map(function(cartItem) { return {id: cartItem.item.id, quantity: cartItem.quantity}; });
        if(cartItems.length <= 0) {
            cartModel.errors = ["Cart items cannot be empty"];
            Cart.upateBehaviourSubjectWithoutSyncing(cartModel);
            return;
        }
        let cartData = {
            "cartItems": cartItems,
            "shippingDetails": cartModel.shippingDetails,
            "couponDetails": cartModel.couponDetails
        };
        $.ajax({
            url: cartPageOptions.endpoints.createOrderURL,
            data: cartData,
            method: "POST",
            success: function (data, textStatus, jqXHR) {
                Order.setOrderId(data.orderId);
                window.location.href = cartPageOptions.endpoints.confirmationPageUrl;
            },
            dataType: "json"
        });
    },
    cartItemIncrementerElement: ".mcart-cartpage-cartitem-incrementer",
    onCartItemIncrementerElementClicked: function (Cart:Cart, cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        let product: Product = cartItem.item;
        Cart.insertProductToCart(product, 1);
    },
    cartItemDecrementerElement: ".mcart-cartpage-cartitem-decrementer",
    onCartItemDecrementerElementClicked: function (Cart:Cart, cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        let product: Product = cartItem.item;
        Cart.removeProductFromCart(product, 1);
    },
    cartItemRemoveElement: ".mcart-cartpage-cartitem-remove",
    onCartItemRemoveElementClicked: function (Cart:Cart, cartPageOptions: CartPageOptions, cartItem: CartItem, event: JQueryEventObject, $this: JQuery) {
        Cart.removeCartItemFromCart(cartItem);
    }
};