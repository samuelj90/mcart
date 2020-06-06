import { Cart } from "./cart";
import { CartPage } from "./cart-page";
import { ConfirmationPage } from "./confirmation-page";
import { IMCartOptions } from "./mcart-options";
import { MiniCart } from "./mini-cart";
import { Order } from "./order";
import { ProductListing } from "./product-listing";
import { isNullOrUndefined } from "./utils";

export class MCart {
    public static NAME: string = "mCart";
    private rootElement: JQuery;
    private options: IMCartOptions;

    constructor(rootElement: JQuery, options: IMCartOptions) {
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
        this.initializeOrder();
    }

    private initializeProductListing(): void | ProductListing  {
        if (isNullOrUndefined(this.options.productListing) || this.options.productListing.length <= 0) {
            return;
        }
        return new ProductListing(this.options.productListing);
    }

    private initializeCart(): void  {
        Cart.getInstance(this.options.cart);
    }

    private initializeMiniCart(): void | MiniCart {
        if (isNullOrUndefined(this.options.miniCart) || this.options.miniCart.length <= 0) {
            return;
        }
        return new MiniCart(this.options.miniCart);
    }

    private initializeCartPage(): void | CartPage {
        if (isNullOrUndefined(this.options.cartPage)) {
            return;
        }
        return new CartPage(this.options.cartPage);
    }
    private initializeCartConfirmPage(): void | ConfirmationPage {
        if (isNullOrUndefined(this.options.confirmationPage)) {
            return;
        }
        return new ConfirmationPage(this.options.confirmationPage);
    }
    private initializeOrder() {
        Order.getInstance(this.options.order);
    }
}
