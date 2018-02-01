import { CartItem } from "../cart/cart-item";
import { MiniCartTemplateOptions } from "./mini-cart-template-options";

export interface MiniCartOptions {
    renderTo?: JQuery;
    replaceRenderToContents: boolean,
    templateOptions: MiniCartTemplateOptions
    onLinkBtnClicked?: () => void;
    onViewCartBtnClicked?: () => void;
    onProceedToCheckoutBtnClicked?: () => void;
}