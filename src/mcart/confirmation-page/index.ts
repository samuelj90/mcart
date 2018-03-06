import { ConfirmationPageOptions } from "./confirmation-page-options";
import { isNullOrUndefined } from "util";
import { Cart } from "../cart";
import { CartItem } from "../cart/cart-item";
import { ShippingDetailsFormModel } from "../cart-page/shipping-details-form-model";

export class ConfirmationPage {
    private orderModel: any;
    constructor(confirmationPageOptions: ConfirmationPageOptions) {
        if (isNullOrUndefined(confirmationPageOptions)) {
            return;
        }
        if (confirmationPageOptions.renderTo.length <= 0) {
            return;
        }
        this.initializeConfirmationPage(confirmationPageOptions);
        let cartItems: CartItem[] = this.orderModel.cartItems;
        this.renderConfirrmationPage(confirmationPageOptions, cartItems);
        this.initializeEventListerners(confirmationPageOptions);
    }
    private initializeConfirmationPage(confirmationPageOptions: ConfirmationPageOptions) {
        if (localStorage.getItem("mcart-order-model")) {
            let templateOptions = confirmationPageOptions.templateOptions;
            this.orderModel = JSON.parse(localStorage.getItem("mcart-order-model"));
            let template = templateOptions.template(templateOptions);
            if (confirmationPageOptions.replaceRenderToContents) {
                confirmationPageOptions.renderTo.html("");
            }
            confirmationPageOptions.renderTo.append(template);
        } else {
            window.location.href = "/";
        }
    }
    private renderConfirrmationPage(confirmationPageOptions: ConfirmationPageOptions, cartItems: CartItem[]) {
        let templateOptions = confirmationPageOptions.templateOptions;
        let cartItemsContainer = $("#" + templateOptions.cartItemsContainerId);
        let subTotal = 0, cartItemTotalQty = 0;
        if (cartItems.length === 0) {
            window.location.href = "/";
        } else {
            cartItemsContainer.html("");
            cartItems.forEach((cartItem: CartItem, index: number, cartItems: CartItem[]) => {
                subTotal = subTotal + (cartItem.quantity * cartItem.item.price);
                cartItemTotalQty = cartItemTotalQty + cartItem.quantity;
                let template = templateOptions.cartItemTemplate(templateOptions, cartItem, index, cartItems);
                cartItemsContainer.append(template);
            });
        }
        let footerData = {
            subTotal: subTotal
        }
        let cartItemsFooterTemplate = templateOptions.cartItemsFooterTemplate(templateOptions, cartItems, footerData);
        $("#" + templateOptions.cartItemsFooterContainerId).html(cartItemsFooterTemplate);
        let shippingDetails = this.orderModel.shippingDetails;
        let shippingDetailsTemplate = templateOptions.shippingDetailsTemplate(templateOptions, shippingDetails);
        $("#" + templateOptions.shippingDetailsContainerId).html(shippingDetailsTemplate);
        let couponCode = this.orderModel.couponCodeDetails;
        let couponCodeTemplate = templateOptions.couponCodeTemplate(templateOptions, couponCode);
        $("#" + templateOptions.couponCodeContainerId).html(couponCodeTemplate);
    }
    private initializeEventListerners(confirmationPageOptions: ConfirmationPageOptions) {
        let templateOptions = confirmationPageOptions.templateOptions;
        let self = this;
        confirmationPageOptions.renderTo.on("click", "#" + templateOptions.confirmButtonId, function () {
            $.ajax({
                url: confirmationPageOptions.createOrderURL,
                method: "POST",
                data: self.orderModel,
                success: function (data, textStatus, jqXHR) {
                    window.location.href = data.paypalURL
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    let alertMessages = self.createAlert("error", errorThrown);
                    confirmationPageOptions.renderTo.find("#" + templateOptions.alertMessageContainerId).html(alertMessages);
                }
            })
        });
    }
    createAlert(alertType: string, alertMessage: string) {
        return "<div class=\"alert alert-danger alert-dismissible\">" +
            "    <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>" +
            alertMessage +
            "  </div>";
    }
}