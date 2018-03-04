import { Cart } from "../cart";
import { CartPageOptions } from "./cart-page-options";
import { isNullOrUndefined } from "../utils";
import { defaultCartPageOptions } from "./default-cart-page-options";
import { CartItem } from "../cart/cart-item";
import { Product } from "../product-listing/product";
import { ShippingDetailsFormModel } from "./shipping-details-form-model";

export class CartPage extends Cart {
    private cartPageModel: any = {
        shippingFormValid : false
    };
    constructor(cartPageOptions: CartPageOptions) {
        super();
        if (isNullOrUndefined(cartPageOptions)) {
            return;
        }
        if (cartPageOptions.renderTo.length <= 0) {
            return;
        }
        cartPageOptions = $.extend({}, defaultCartPageOptions, cartPageOptions);
        this.initializeCartPage(cartPageOptions);
        const behaviourSubject = this.getCartItemsSubject();
        const self = this;
        behaviourSubject.subscribe(
            function (cartItems: CartItem[]) {
                console.debug("cartItems >> ", cartItems)
                self.cartPageModel.cartItems = cartItems;
                self.renderCartPage(cartPageOptions, cartItems);
            },
            function (error) {
                console.log("Error", error);
            },
            function () {
                console.debug("Completed");
            }
        );
        this.initializeEventListerners(cartPageOptions);
        console.log(behaviourSubject.observers);
    }
    initializeCartPage(cartPageOptions: CartPageOptions): void {
        if (cartPageOptions.replaceRenderToContents) {
            cartPageOptions.renderTo.html("");
        }
        let templateOptions = cartPageOptions.templateOptions;
        let template = templateOptions.template(templateOptions);
        cartPageOptions.renderTo.append(template);
    }
    renderCartPage(cartPageOptions: CartPageOptions, cartItems: CartItem[]): void {
        // iterate over cart items and display items
        let templateOptions = cartPageOptions.templateOptions;
        let cartItemsContainer = $("#" + templateOptions.cartItemsContainerId);
        let subTotal = 0, cartItemTotalQty = 0;
        if (cartItems.length === 0) {
            cartItemsContainer.html("<tr><td colspan=\"5\"><br/><br/><center>No items in Cart</center><br/><br/></td></tr>");
        } else {
            cartItemsContainer.html("");
            cartItems.forEach((cartItem: CartItem, index: number, cartItems: CartItem[]) => {
                subTotal = subTotal + (cartItem.quantity * cartItem.item.price);
                cartItemTotalQty = cartItemTotalQty + cartItem.quantity;
                let template = templateOptions.cartItemTemplate(templateOptions, cartItem, index, cartItems);
                cartItemsContainer.append(template)
                cartItemsContainer.find("." + templateOptions.removeItemFromCartBtnElementClass + ":last").data("cartitem", cartItem)
                cartItemsContainer.find("." + templateOptions.cartItemIncrementerElementClass + ":last").data("cartitem", cartItem)
                cartItemsContainer.find("." + templateOptions.cartItemDecrementerElementClass + ":last").data("cartitem", cartItem)
            });
        }
        let footerData = {
            subTotal: subTotal
        }
        let cartItemsFooterTemplate = templateOptions.cartItemsFooterTemplate(templateOptions, cartItems, footerData);
        $("#" + templateOptions.cartItemsFooterContainerId).html(cartItemsFooterTemplate);
        let shippingDetailsFormModel: ShippingDetailsFormModel = this.loadShippingDetailsFormModel(cartPageOptions);
        let shippingDetailsFormTemplate = templateOptions.shippingDetailsFormTemplate(templateOptions, shippingDetailsFormModel);
        $("#" + templateOptions.shippingDetailsFormContainerId).html(shippingDetailsFormTemplate);
        let couponCodeFormTemplate = templateOptions.couponCodeFormTemplate(templateOptions);
        $("#" + templateOptions.couponCodeFormContainerId).html(couponCodeFormTemplate);
    }
    initializeEventListerners(cartPageOptions: CartPageOptions): void {
        let self = this;
        let templateOptions = cartPageOptions.templateOptions;
        let cartItemsContainer = cartPageOptions.renderTo.find("#" + templateOptions.cartItemsContainerId);
        cartPageOptions.renderTo.on("click", ("." + templateOptions.removeItemFromCartBtnElementClass), function () {
            console.debug("." + templateOptions.removeItemFromCartBtnElementClass + " clicked");
            let cartItem: CartItem = $(this).data("cartitem");
            if (!cartPageOptions.overideOnCartItemRemoveBtnClicked) {
                Cart.removeCartItemFromCart(cartItem);
            }
            if (!isNullOrUndefined(cartPageOptions.onCartItemRemoveBtnClicked)) {
                cartPageOptions.onCartItemRemoveBtnClicked(cartPageOptions, cartItem);
            }
        });
        cartPageOptions.renderTo.on("click", ("." + templateOptions.cartItemIncrementerElementClass), function () {
            let cartItem: CartItem = $(this).data("cartitem");
            let product: Product = cartItem.item;
            Cart.insertProductToCart(product, 1);
        });
        cartPageOptions.renderTo.on("click", ("." + templateOptions.cartItemDecrementerElementClass), function () {
            let cartItem: CartItem = $(this).data("cartitem");
            let product: Product = cartItem.item;
            Cart.removeProductFromCart(product, 1);
        });
        cartPageOptions.renderTo.on("submit", ("#" + templateOptions.shippingDetailsFormElemtnId), function (event) {
            event.preventDefault();
            console.debug("Shipping details form submitted");
            self.updateCartTotalsOnShippingDetailsChanged(cartPageOptions);
            self.cartPageModel.shippingFormValid = true;
        });
        cartPageOptions.renderTo.on("submit", ("#" + templateOptions.couponCodeFormElemtnId), function (event) {
            event.preventDefault();
            console.debug("Coupon code form submitted");
            self.updateCouponCodeChanged(cartPageOptions);
        });
        cartPageOptions.renderTo.on("change", ("#" + templateOptions.shippingDetailsFormCountryElemtnId), function () {
            let shippingDetailsFormModel = self.loadShippingDetailsFormModel(cartPageOptions);
            let states = shippingDetailsFormModel.states[$(this).find("option:selected").val()]
            $(("#" + templateOptions.shippingDetailsFormStateElemtnId)).html("<option selected value=\"\"> Select a State</option> " + shippingDetailsFormModel.convertArrayToOptions(states));
        })
        cartPageOptions.renderTo.on("click", "#" + templateOptions.checkoutBtnId, function(){
            cartPageOptions.renderTo.find("#" + templateOptions.couponCodeFormElemtnId).submit();
            let alertMessages = ""
            console.log(self.cartPageModel.cartItems);
            if (self.cartPageModel.cartItems.length < 1) {
                alertMessages = alertMessages + self.createAlert("error", "Cart items is empty");
            }
            console.log(self.cartPageModel.shippingDetails);
            if (!self.cartPageModel.shippingFormValid) {
                alertMessages = alertMessages + self.createAlert("error", "Shipping details is not valid or pls submit shipping details");
            }
            if (alertMessages === "") {
                localStorage.setItem("mcart-cart-page-model", JSON.stringify(self.cartPageModel));
                window.location.href = cartPageOptions.checkoutConfirmUrl;
            }
            cartPageOptions.renderTo.find("#" + templateOptions.alertMessageContainerId).html(alertMessages);
        });
    }
    loadShippingDetailsFormModel(cartPageOptions: CartPageOptions): ShippingDetailsFormModel {
        return {
            countries: ["Australia"],
            states: {
                "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast–Tweed Heads", "Newcastle–Maitland", "Canberra–Queanbeyan", "Sunshine Coast", "Wollongong", "Hobart", "Geelong", "Townsville", "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Albury–Wodonga", "Launceston", "Mackay", "Rockhampton", "Bunbury", "Bundaberg", "Coffs Harbour", "Wagga Wagga", "Hervey Bay", "Mildura–Wentworth", "Shepparton–Mooroopna", "Port Macquarie", "Gladstone–Tannum Sands", "Tamworth", "Traralgon–Morwell", "Orange", "Bowral–Mittagong", "Geraldton", "Busselton", "Dubbo", "Nowra–Bomaderry", "Bathurst", "Warragul–Drouin", "Warrnambool", "Albany", "Kalgoorlie–Boulder", "Devonport"]
            },
            convertArrayToOptions: function (arrayOfOptions) {
                let returnValue = "";
                if (arrayOfOptions.length >= 1) {
                    for (let i = 0; i < arrayOfOptions.length; i++) {
                        returnValue = returnValue + "<option value=\"" + arrayOfOptions[i] + "\">" + arrayOfOptions[i] + "</option>"
                    }
                }
                return returnValue;
            }
        };
    }
    updateCartTotalsOnShippingDetailsChanged(cartPageOptions: CartPageOptions) {
        let templateOptions = cartPageOptions.templateOptions;
        this.cartPageModel.shippingDetails = this.getFormData($("#" + templateOptions.shippingDetailsFormElemtnId))
    }
    getFormData($form) {
        let unindexed_array = $form.serializeArray();
        let indexed_array = {};
        $.map(unindexed_array, function(n, i){
            indexed_array[n["name"]] = n["value"];
        });
        return indexed_array;
    }
    createAlert(alertType: string, alertMessage: string) {
        return "<div class=\"alert alert-danger alert-dismissible\">" +
        "    <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>" +
        alertMessage +
        "  </div>";
    }
    updateCouponCodeChanged(cartPageOptions: CartPageOptions) {
        let templateOptions = cartPageOptions.templateOptions;
        this.cartPageModel.couponCodeDetails = this.getFormData($("#" + templateOptions.couponCodeFormElemtnId))
    }
}