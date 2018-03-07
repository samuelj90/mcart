import { MCartOptions } from "./mcart-options";
import { isNullOrUndefined } from "./utils";
import { ProductListing } from "./product-listing";
import { MiniCart } from "./mini-cart";
import { Cart } from "./cart";
import { CartPage } from "./cart-page";
import { ConfirmationPage } from "./confirmation-page";

export class MCart {
    public static NAME: string = "mCart";
    private rootElement: JQuery;
    private options: MCartOptions;

    constructor(rootElement: JQuery, options: MCartOptions) {
        if (isNullOrUndefined(options)) {
            throw new Error("options may not be empty!");
        }
        this.rootElement = rootElement;
        this.options = options;
        this.init();
    }

    private init(): void {
        this.initializeProductListing();
        this.initializeCart();
        this.initializeMiniCart();
        this.initializeCartPage();
        this.initializeCartConfirmPage();
    }

    private initializeProductListing(): void  {
        if (isNullOrUndefined(this.options.productListing) || this.options.productListing.length <= 0) {
            return;
        }
        new ProductListing(this.options.productListing);
    }

    private initializeCart(): void  {
        new Cart(this.options.cart);
    }

    private initializeMiniCart(): void  {
        if (isNullOrUndefined(this.options.miniCart) || this.options.miniCart.length <= 0) {
            return;
        }
        new MiniCart(this.options.miniCart);
    }

    private initializeCartPage(): void  {
        if (isNullOrUndefined(this.options.cartPage)) {
            return;
        }
        new CartPage(this.options.cartPage);
    }
    private initializeCartConfirmPage(): void  {
        if (isNullOrUndefined(this.options.confirmationPage)) {
            return;
        }
        new ConfirmationPage(this.options.confirmationPage);
    }

}