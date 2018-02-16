import { CartPageTemplateOptions } from "./cart-page-template-options";
import { CartItem } from "../cart/cart-item";

export interface CartPageOptions {
    renderTo: JQuery,
    replaceRenderToContents: boolean,
    templateOptions: CartPageTemplateOptions;
    onProceedToCheckoutBtnClicked?: (cartPageOptions: CartPageOptions) => void;
    overideOnProceedToCheckoutBtnClicked?: boolean;
    onCartItemRemoveBtnClicked?: (cartPageOptions: CartPageOptions, cartItem: CartItem) => void;
    overideOnCartItemRemoveBtnClicked?: boolean;
    afterCartItemIncremented?: () => void;
    beforeCartItemDecremented?: () => void;
    afterCartItemDecremented?: () => void;
    beforeCheckoutClicked?: () => void;
    afterCheckoutClicked?: () => void;
    couponCodeImplementation?: () => void;
    beforeApplyCouponCode?: () => void;
    afterCouponCodeApplied?: () => void;
}