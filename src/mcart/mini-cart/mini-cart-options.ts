import { CartItem } from "../cart/cart-item";
import { MiniCartTemplateOptions } from "./mini-cart-template-options";
import { Cart } from "../cart";

export interface MiniCartOptions {
    renderTo?: JQuery;
    replaceRenderToContents: boolean,
    templateOptions: MiniCartTemplateOptions
    onLinkBtnClicked?: (miniCartOptions: MiniCartOptions) => void;
    overideOnLinkBtnClicked?: boolean;
    onViewCartBtnClicked?: (miniCartOptions: MiniCartOptions) => void;
    overideOnViewCartBtnClicked?: boolean;
    onProceedToCheckoutBtnClicked?: (miniCartOptions: MiniCartOptions) => void;
    overideOnProceedToCheckoutBtnClicked?: boolean;
    onCartItemRemoveBtnClicked?: (miniCartOptions: MiniCartOptions, cartItem: CartItem) => void;
    overideOnCartItemRemoveBtnClicked?: boolean;
}