import * as ejs from "ejs";
import { Cart } from "../cart";
import { ICartItem } from "../cart/cart-item";
import { Order } from "../order";
import { IProduct } from "../product-listing/product";
import { countries } from "./../shared/countries";
import { states } from "./../shared/states";
import { ICartPageOptions } from "./cart-page-options";
import { cartPageTemplate } from "./cart-page-template";
import { selectOptionTemplate } from "./select-options-template";

declare let window: any;

export const defaultCartPageOptions: ICartPageOptions = {
    cartFormElement: "#mcart-cartpage-form",
    cartItemDecrementerElement: ".mcart-cartpage-cartitem-decrementer",
    cartItemIncrementerElement: ".mcart-cartpage-cartitem-incrementer",
    cartItemRemoveElement: ".mcart-cartpage-cartitem-remove",
    endpoints: {
        confirmationPageUrl: "/confirmation.html",
        createOrderURL: "/api/order/",
    },
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: cartPageTemplate,
    templateOptions: {},
    beforeCartPageRender(cartPageOptions: ICartPageOptions, templateOptions: { [key: string]: any }) {
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
    afterCartPageRender(cartPageOptions: ICartPageOptions, templateOptions: { [key: string]: string }) {
        cartPageOptions.renderToElement.on("click", "#" + templateOptions.shippingFormSubmitBtn, (event) => {
            event.preventDefault();
            event.stopPropagation();
            const shippingDetails = {};
            cartPageOptions.renderToElement.find("#" + templateOptions.shippingFormElementId).find("input, select, textarea").each((index: number, elem: Element) => {
                shippingDetails[$(this).attr("name")] = $(this).val();
            });
            Cart.getInstance().setShippingDetails(shippingDetails);
        });
        cartPageOptions.renderToElement.on("click", "#" + templateOptions.couponFormSubmitBtn, (event) => {
            event.preventDefault();
            event.stopPropagation();
            const couponDetails = {};
            cartPageOptions.renderToElement.
                find("#" + templateOptions.couponDetailsFormElementId)
                .find("input").each((index: number, elem: Element) => {
                    couponDetails[$(this).attr("name")] = $(this).val();
                });
            Cart.getInstance().setCouponDetails(couponDetails);
        });
        cartPageOptions.renderToElement.on("change", "#" + templateOptions.shippingCountrySelectId, (event) => {
            const selectedCountry = $(this).find("option:selected").data("selectedoption");
            const correspondingStates = states.filter((state) => {
                return state.country_id === selectedCountry.id;
            });
            const templateData = {
                options: correspondingStates,
                selectedOption: null,
            };
            const template = ejs.compile(selectOptionTemplate)(templateData);
            cartPageOptions.renderToElement.find("#" + templateOptions.shippingStateSelectId).html(template);

        });
        cartPageOptions.renderToElement.on("change", "#" + templateOptions.shippingStateSelectId, (event) => {
            const selectedState = $(this).find("options:selected").data("selectedoption");
        });
    },
    onCartFormSubmit(
        CartOb: Cart,
        OrderOb: Order,
        cartPageOptions: ICartPageOptions,
        event: JQueryEventObject,
        $this: JQuery) {
        const cartModel = CartOb.getCartModelSubject().value;
        const cartItems = cartModel.cartItems.map(
            (cartItem) => {
                return { id: cartItem.item.id, quantity: cartItem.quantity };
            });
        if (cartItems.length <= 0) {
            cartModel.errors = ["Cart items cannot be empty"];
            CartOb.upateBehaviourSubjectWithoutSyncing(cartModel);
            return;
        }
        const cartData = {
            cartItems,
            couponDetails: cartModel.couponDetails,
            shippingDetails: cartModel.shippingDetails,
        };
        $.ajax({
            data: cartData,
            dataType: "json",
            method: "POST",
            success(data, textStatus, jqXHR) {
                OrderOb.setOrderId(data.orderId);
                window.location.href = cartPageOptions.endpoints.confirmationPageUrl;
            },
            url: cartPageOptions.endpoints.createOrderURL,
        });
    },

    onCartItemIncrementerElementClicked(
        CartOb: Cart,
        cartPageOptions: ICartPageOptions,
        cartItem: ICartItem,
        event: JQueryEventObject,
        $this: JQuery) {
        const product: IProduct = cartItem.item;
        CartOb.insertProductToCart(product, 1);
    },

    onCartItemDecrementerElementClicked(
        CartOb: Cart,
        cartPageOptions: ICartPageOptions,
        cartItem: ICartItem,
        event: JQueryEventObject,
        $this: JQuery) {
        const product: IProduct = cartItem.item;
        CartOb.removeProductFromCart(product, 1);
    },

    onCartItemRemoveElementClicked(
        CartOb: Cart,
        cartPageOptions: ICartPageOptions,
        cartItem: ICartItem,
        event: JQueryEventObject,
        $this: JQuery) {
        CartOb.removeCartItemFromCart(cartItem);
    },
};
