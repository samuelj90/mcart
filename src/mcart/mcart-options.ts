import { ProductListingOptions } from "./product-listing/product-listing-options";
export interface MCartOptions {
    productListing: ProductListingOptions | null;
    minCart: MiniCartOptions;
    cartPage: CartPageOptions;
    confirmationPage: ConfirmationPageOptions;
    isLocalStorageBased: boolean;
}

export interface MiniCartOptions {
    template?: string;
    appendElement?: JQuery;
    miniCartViewCartEnabled?: boolean;
    miniCartProceedToCheckout?: boolean;
}

export interface CartPageOptions {
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
export interface ConfirmationPageOptions {

}