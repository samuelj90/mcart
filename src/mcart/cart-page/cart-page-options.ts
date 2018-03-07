import { CartPageTemplateOptions } from "./cart-page-template-options";
import { CartItem } from "../cart/cart-item";

export interface CartPageOptions {
    renderToElement: JQuery;
    replaceRenderToElementContent: boolean;
    template: string;
}