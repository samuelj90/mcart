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
        if (productListingOptions.renderTo.length <= 0) {
            return;
        }
        const combainedProductListingOptions = $.extend({}, defaultProductListingOptions, productListingOptions);
        this.initializeProductListing(combainedProductListingOptions);
    }

    public initializeProductListing(productListingOptions: ProductListingOptions): void {
        if (!isNullOrUndefined(productListingOptions.beforeProductListing)) {
            productListingOptions.beforeProductListing(productListingOptions);
        }
        if (productListingOptions.replaceRenderToContents) {
            productListingOptions.renderTo.html("");
        }
        if (isNullOrUndefined(productListingOptions.products)) {
            $.get(
                productListingOptions.endpoints.getProducts,
                (data: any, textStatus: string, jqXHR: JQueryXHR) => {
                    productListingOptions.products = data;
                    this.renderProductListing(productListingOptions);
                }
            );
        } else {
            this.renderProductListing(productListingOptions);
        }
    }

    private renderProductListing(productListingOptions: ProductListingOptions) {
        productListingOptions.products.forEach((product, index, proudcts) => {
            let templateOptions = productListingOptions.templateOptions;
            let template = templateOptions.template(templateOptions, product);
            productListingOptions.renderTo.append(template);
            productListingOptions.renderTo.find("." + productListingOptions.templateOptions.addToCartBtnElementClass + ":last").data("product", product)
            if (index === (proudcts.length - 1)) {
                if (!isNullOrUndefined(productListingOptions.afterProductListing)) {
                    productListingOptions.afterProductListing(productListingOptions);
                }
                this.initializeProductListingEventListeners(productListingOptions);
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
            if (!isNullOrUndefined(productListingOptions.onAddToCartBtnClicked)) {
                productListingOptions.onAddToCartBtnClicked(event, product);
            }
        });
        $("body").on("click", buyNowBtnElementSelector, function (event) {
            if (!isNullOrUndefined(productListingOptions.onBuyNowBtnClicked)) {
                productListingOptions.onBuyNowBtnClicked(event);
            }
        });
    }
}