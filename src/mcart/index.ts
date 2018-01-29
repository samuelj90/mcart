import { MCartOptions } from "./mcart-options";
import { isNullOrUndefined } from "./utils";

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
    }

    private initializeProductListing() {
        if (isNullOrUndefined(this.options.productListing)) {
            return;
        }
        let productListing = this.options.productListing;
        if (productListing.products.length > 0) {
            if (isNullOrUndefined(productListing.appendElement)) {
                return;
            }
            if (!isNullOrUndefined(productListing.beforeProductListingCallbackFn)) {
                productListing.beforeProductListingCallbackFn();
            }

            productListing.products.forEach(product => {
                let template = this.getProductListingTemplate(product, productListing.template);
                productListing.appendElement.append(template);
            });
            if (!isNullOrUndefined(productListing.afterProductListingCallbackFn)) {
                productListing.afterProductListingCallbackFn();
            }
        }
    }
    private getProductListingTemplate(product, template) {
        let templateString;
        if (isNullOrUndefined(template)) {
            templateString = `<div class="product col-md-3 no_padding wow animated fadeInUp">
            <div class="wrapper">
              <div class="image">
                <img src="images/poster01.jpg"> </div>
              <span class="price">  ${product.price}</span>
              <h5> ${product.title} </h5>
              <p>${product.description}</p>
              <a class="add_to_cart">add to cart <i class="icon_cart"></i></a> <a href="cart.html" class="buy_button">Buy Now</a> </div>
            </div>`;
        } else {
            templateString = template(product);
        }

        return templateString;
    }
}