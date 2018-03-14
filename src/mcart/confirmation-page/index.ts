import { ConfirmationPageOptions } from "./confirmation-page-options";
import { isNullOrUndefined } from "util";
import { Cart } from "../cart";
import { CartItem } from "../cart/cart-item";
import { Order } from "../order";
import { RenderToElementNotFound } from "../render-to-element-notfound";
import { defaultConfirmationPageOptions } from "./default-confirmation-page-options";
import *  as ejs from "ejs";
export class ConfirmationPage {
  constructor(confirmationPageOptions: ConfirmationPageOptions) {
    this.renderConfirmationPage (confirmationPageOptions);
  }
  private renderConfirmationPage(confirmationPageOptions: ConfirmationPageOptions): void {
    if (confirmationPageOptions.renderToElement.length <= 0) {
      throw new RenderToElementNotFound(confirmationPageOptions.renderToElement, "renderToElement of cartpage is not found in DOM");
    }
    confirmationPageOptions = $.extend({}, defaultConfirmationPageOptions, confirmationPageOptions);
    if (confirmationPageOptions.replaceRenderToElementContent) {
      confirmationPageOptions.renderToElement.html("");
    }
    let orderInstance = Order.getInstance();
    let templateData = {
      orderModel: orderInstance,
      templateOptions: confirmationPageOptions.templateOptions
    };
    let template = ejs.compile(confirmationPageOptions.template)(templateData);
    confirmationPageOptions.renderToElement.append(template);
  }
}