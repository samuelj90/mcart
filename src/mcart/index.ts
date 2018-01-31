import { MCartOptions } from "./mcart-options";
import { isNullOrUndefined } from "./utils";
import { ProductListing } from "./product-listing";
import { MiniCart } from "./mini-cart";

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

    private init() {
        this.initializeProductListing();
        this.initializeMiniCart()
    }

    private initializeProductListing() {
        return new ProductListing(this.options.productListing);
    }
    private initializeMiniCart(): any {
        return new MiniCart(this.options.miniCart);
    }

}