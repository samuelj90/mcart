import { CartOptions } from "./cart/cart-options";
import { ProductListingOption} from "./product-listing/product-listing-option";
import { MiniCartOption } from "./mini-cart/mini-cart-options";
import { CartPageOptions } from "./cart-page/cart-page-options";
import { ConfirmationPageOptions } from "./confirmation-page/confirmation-page-options";
import { OrderOptions } from "./order/order-options";
export interface MCartOptions {
    productListing: ProductListingOption[] | null;
    cart: CartOptions;
    miniCart: MiniCartOption[];
    cartPage: CartPageOptions;
    confirmationPage: ConfirmationPageOptions;
    order: OrderOptions;
}
