import { MCartOptions } from "./mcart-options";
import { isNullOrUndefined } from "./utils";
import { ProductListing } from "./product-listing";
import { MiniCart } from "./mini-cart";
import { Cart } from "./cart";
import { CartPage } from "./cart-page";

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
        this.initializeCart()
        this.initializeMiniCart();
        this.initializeCartPage();
    }

    private initializeProductListing(): void  {
        new ProductListing(this.options.productListing);
    }

    private initializeCart(): void  {
        new Cart(this.options.cart)
    }

    private initializeMiniCart(): void  {
        new MiniCart(this.options.miniCart);
    }

    private initializeCartPage(): void  {
        new CartPage(this.options.cartPage);
    }

}