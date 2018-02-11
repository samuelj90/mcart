import { ProductListingOptions } from "./product-listing/product-listing-options";
import { MiniCartOptions } from "./mini-cart/mini-cart-options";
import { CartPageOptions } from "./cart-page/cart-page-options";
import { ConfirmationPageOptions } from "./confirmation-page/confirmation-page-options";
export interface MCartOptions {
    productListing: ProductListingOptions | null;
    miniCart: MiniCartOptions;
    cartPage: CartPageOptions;
    confirmationPage: ConfirmationPageOptions;
    isLocalStorageBased: boolean;
}
