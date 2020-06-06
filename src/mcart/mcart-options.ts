import { ICartPageOptions } from "./cart-page/cart-page-options";
import { ICartOptions } from "./cart/cart-options";
import { ConfirmationPageOptions } from "./confirmation-page/confirmation-page-options";
import { IMiniCartOption } from "./mini-cart/mini-cart-options";
import { IOrderOptions } from "./order/order-options";
import { IProductListingOption} from "./product-listing/product-listing-option";
export interface IMCartOptions {
    productListing: IProductListingOption[] | null;
    cart: ICartOptions;
    miniCart: IMiniCartOption[];
    cartPage: ICartPageOptions;
    confirmationPage: ConfirmationPageOptions;
    order: IOrderOptions;
}
