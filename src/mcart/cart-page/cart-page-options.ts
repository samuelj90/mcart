import { CartPageTemplateOptions } from "./cart-page-template-options";

export interface CartPageOptions {
    renderTo: JQuery,
    replaceRenderToContents: boolean,
    templateOptions: CartPageTemplateOptions;
    beforeCartItemIncremented?: () => void;
    afterCartItemIncremented?: () => void;
    beforeCartItemDecremented?: () => void;
    afterCartItemDecremented?: () => void;
    beforeCheckoutClicked?: () => void;
    afterCheckoutClicked?: () => void;
    couponCodeImplementation?: () => void;
    beforeApplyCouponCode?: () => void;
    afterCouponCodeApplied?: () => void;
}