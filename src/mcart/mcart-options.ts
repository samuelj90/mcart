import { ProductListingOptions } from "./product-listing/product-listing-options";
import { MiniCartOptions } from "./mini-cart/mini-cart-options";
export interface MCartOptions {
    productListing: ProductListingOptions | null;
    minCart: MiniCartOptions;
    cartPage: CartPageOptions;
    confirmationPage: ConfirmationPageOptions;
    isLocalStorageBased: boolean;
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