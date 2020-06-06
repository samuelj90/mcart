import * as ejs from "ejs";
import { isNullOrUndefined } from "util";
import { Order } from "../order";
import { RenderToElementNotFound } from "../render-to-element-notfound";
import { ConfirmationPageOptions } from "./confirmation-page-options";
import { defaultConfirmationPageOptions } from "./default-confirmation-page-options";
declare let window: any;
export class ConfirmationPage {
  constructor(confirmationPageOptions: ConfirmationPageOptions) {
    this.renderConfirmationPage(confirmationPageOptions);
  }
  private renderConfirmationPage(confirmationPageOptions: ConfirmationPageOptions): void {
    if (confirmationPageOptions.renderToElement.length <= 0) {
      throw new RenderToElementNotFound(confirmationPageOptions.renderToElement, "renderToElement of cartpage is not found in DOM");
    }
    confirmationPageOptions = $.extend({}, defaultConfirmationPageOptions, confirmationPageOptions);
    if (confirmationPageOptions.replaceRenderToElementContent) {
      confirmationPageOptions.renderToElement.html("");
    }
    const orderId = Order.getInstance().getOrderId();
    if (isNullOrUndefined(orderId)) {
      window.location.href = confirmationPageOptions.endpoints.noOrderReturnURL;
    }
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": window.Laravel.csrfToken,
      },
    });
    $.ajax({
      url: confirmationPageOptions.endpoints.getOrderModelURL + "/" + orderId,
    }).done((data) => {
      const orderModel = data;
      if (isNullOrUndefined(orderModel)) {
        window.location.href = confirmationPageOptions.endpoints.noOrderReturnURL;
        return;
      }
      const templateData = {
        orderModel,
        templateOptions: confirmationPageOptions.templateOptions,
      };
      const template = ejs.compile(confirmationPageOptions.template)(templateData);
      confirmationPageOptions.renderToElement.append(template);
    });
  }
}
