import { ProductListingTemplateOptions } from "./product-listing-template-options";
import { Product } from "./product";
import { ProductListingOptions } from "./product-listing-options";
import { isNullOrUndefined } from "util";
import { Cart } from "../cart";
import { defaultProductListingOptions } from "./default-product-listing-options";

export class ProductListing {
    constructor(private productListingOptions: ProductListingOptions) {
        if (isNullOrUndefined(productListingOptions)) {
            return;
        }
        const defaultProductListingOptions: ProductListingOptions = this.getDefaulatTemplateListingOptions();
        const combainedProductListingOptions = $.extend({}, defaultProductListingOptions, productListingOptions);
        this.initializeProductListing(combainedProductListingOptions);
        this.initializeProductListingEventListeners(combainedProductListingOptions);
    }
    private getDefaulatTemplateListingOptions(): ProductListingOptions {
        return defaultProductListingOptions
    }

    public initializeProductListing(productListingOptions: ProductListingOptions): void {
        if (!isNullOrUndefined(productListingOptions.beforeProductListing)) {
            productListingOptions.beforeProductListing(productListingOptions);
        }
        if (productListingOptions.replaceRenderToContents) {
            productListingOptions.renderTo.html("");
        }
        productListingOptions.products.forEach((product, index, proudcts) => {
            let templateOptions = productListingOptions.templateOptions;
            let template = templateOptions.template(templateOptions, product);
            productListingOptions.renderTo.append(template);
            productListingOptions.renderTo.find("." + productListingOptions.templateOptions.addToCartBtnElementClass + ":last").data("product", product)
            if (index === (proudcts.length - 1)) {
                if (!isNullOrUndefined(productListingOptions.afterProductListing)) {
                    productListingOptions.afterProductListing(productListingOptions);
                }
            }
        });
    }

    private initializeProductListingEventListeners(productListingOptions: ProductListingOptions): void {
        const productListingTemplateOptions = productListingOptions.templateOptions;
        let addToCartBtnElementSelector: string = "." + productListingTemplateOptions.addToCartBtnElementClass;
        let buyNowBtnElementSelector: string = "." + productListingTemplateOptions.buyNowBtnElementClass;
        $("body").on("click", addToCartBtnElementSelector, function (event) {
            const product: Product = $(event.target).data("product");
            Cart.insertProductToCart(product, 1);
            productListingOptions.onAddToCartBtnClicked(event, product);
        });
        $("body").on("click", buyNowBtnElementSelector, function (event) {
            productListingOptions.onBuyNowBtnClicked(event);
        });
    }
}