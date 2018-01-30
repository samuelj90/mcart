import { Product } from "src/mcart/product-listing/product";
import { ProductListingOptions } from "./product-listing-options";
import { isNullOrUndefined } from "util";

export class ProductListing {
    constructor(private productListingOptions: ProductListingOptions) {
        if (isNullOrUndefined(productListingOptions)) {
            throw new Error("productListing may not be empty!");
        }
        this.initializeProductListing();
        this.initializeProductListingEventListeners(productListingOptions);
    }
    public initializeProductListing(): void {
        if (this.productListingOptions.products.length > 0) {
            if (isNullOrUndefined(this.productListingOptions.appendElement)) {
                return;
            }
            if (!isNullOrUndefined(this.productListingOptions.beforeProductListing)) {
                this.productListingOptions.beforeProductListing(this.productListingOptions);
            }
            if (this.productListingOptions.replaceAppendElementContents) {
                this.productListingOptions.appendElement.html("");
            }
            this.productListingOptions.products.forEach((product, index, proudcts) => {
                let template = this.getProductListingTemplate(this.productListingOptions, product);
                this.productListingOptions.appendElement.append(template);
                this.productListingOptions.appendElement.find("." + this.productListingOptions.addToCartBtnElementClass + ":last").data("product", product)
                if (index === (proudcts.length - 1)) {
                    if (!isNullOrUndefined(this.productListingOptions.afterProductListing)) {
                        this.productListingOptions.afterProductListing(this.productListingOptions);
                    }
                }
            });
        }
    }
    private getProductListingTemplate(productListingOptions: ProductListingOptions, product: Product): string {
        let templateString;
        // TODO : Fix options that will display undefined
        if (isNullOrUndefined(productListingOptions.template)) {
            templateString = `
            <div class="product">
                <div class="wrapper">
                    <div class="image">
                        <img src="${product.featuredImage}">
                    </div>
                    <span class="price">  ${product.price}</span>
                    <h5> ${product.title} </h5>
                    <p>${product.description}</p>
                    <button class="${productListingOptions.addToCartBtnElementClass}">${productListingOptions.addToCartBtnLabel}</button>
                    <button class="${productListingOptions.buyNowBtnElementClass}">${productListingOptions.buyNowBtnLabel}</button>
                </div>
            </div>
            `;
        } else {
            templateString = productListingOptions.template(productListingOptions, product);
        }
        return templateString;
    }
    private initializeProductListingEventListeners(productListingOptions: ProductListingOptions): void {
        let addToCartBtnElementSelector: string = "." + productListingOptions.addToCartBtnElementClass;
        let buyNowBtnElementSelector: string = "." + productListingOptions.buyNowBtnElementClass;
        $("body").on("click", addToCartBtnElementSelector, function (event) {
            productListingOptions.onAddToCartBtnClicked(event, $(event.target).data("product"));
        });
        $("body").on("click", buyNowBtnElementSelector, function (event) {
            productListingOptions.onBuyNowBtnClicked(event);
        });
    }
}