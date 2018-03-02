import { ConfirmationPageOptions } from "./confirmation-page-options";
import { isNullOrUndefined } from "util";

export class ConfirmationPage {
    private cartPageModel: any;
    constructor(confirmationPageOptions: ConfirmationPageOptions) {
        if (isNullOrUndefined(confirmationPageOptions)) {
            return;
        }
        if (confirmationPageOptions.renderTo.length <= 0) {
            return;
        }
        this.renderConfirrmationPage(confirmationPageOptions);
        this.initializeEventListerners(confirmationPageOptions);
    }
    private renderConfirrmationPage(confirmationPageOptions: ConfirmationPageOptions) {
        if (confirmationPageOptions.replaceRenderToContents) {
            confirmationPageOptions.renderTo.html("");
        }
        let templateOptions = confirmationPageOptions.templateOptions;
        this.cartPageModel = localStorage.getItem("mcart-cart-page-model")
        let template = templateOptions.template(templateOptions, this.cartPageModel);
        confirmationPageOptions.renderTo.append(template);
    }
    private initializeEventListerners(confirmationPageOptions: ConfirmationPageOptions) {
        let templateOptions = confirmationPageOptions.templateOptions;
        let self = this;
        confirmationPageOptions.renderTo.on("click", "#" + templateOptions.confirmButtonId, function () {
            $.ajax({
                url: confirmationPageOptions.checkoutConfirmSubmitUrl,
                method: "POST",
                data: self.cartPageModel,
                success: function(data, textStatus, jqXHR) {
                    localStorage.setItem("orderid", data.orderId);
                    window.location.href = data.paypalURL
                },
                error: function(jqXHR, textStatus, errorThrown) {
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