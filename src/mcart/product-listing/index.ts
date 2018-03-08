import { RenderToElementNotFound } from "../render-to-element-notfound";
import { Product } from "./product";
import { ProductListingOption } from "./product-listing-option";
import { isNullOrUndefined } from "util";
import { Cart } from "../cart";
import { defaultProductListingOption } from "./default-product-listing-options";
import *  as ejs from "ejs";
export class ProductListing {
    constructor(private productListingOptions: ProductListingOption[]) {
        this.renderProductListing(productListingOptions);
    }
    private renderProductListing(productListingOptions: ProductListingOption[]) {
        productListingOptions.forEach((productListingOption: ProductListingOption, index: number, productListingOptions: ProductListingOption[]) => {
            try {
                if (productListingOption.renderToElement.length <= 0) {
                    throw new RenderToElementNotFound(productListingOption.renderToElement, "renderToElement of product listing is not found in DOM");
                }
                productListingOption = $.extend({}, defaultProductListingOption, productListingOption);
                if (productListingOption.replaceRenderToElementContent) {
                    productListingOption.renderToElement.html("");
                }
                let products: Product[] = productListingOption.products;
                let templateData = {
                    products: products
                };
                if (!!productListingOption.addToCartElement) {
                    productListingOption.renderToElement.off("click", productListingOption.addToCartElement);
                }
                if (!!productListingOption.buyNowElement) {
                    productListingOption.renderToElement.off("click", productListingOption.buyNowElement);
                }
                let template = ejs.compile(productListingOption.template)(templateData);
                productListingOption.renderToElement.append(template);
                if (!!productListingOption.addToCartElement) {
                    productListingOption.renderToElement.on("click", productListingOption.addToCartElement, function(event: JQueryEventObject){
                        event.stopPropagation();
                        let $this: JQuery = $(this);
                        let product: Product = $(this).data("product");
                        productListingOption.onAddToCartElementClicked(event, product, $this);
                    });
                }
                if (!!productListingOption.buyNowElement) {
                    productListingOption.renderToElement.on("click", productListingOption.buyNowElement, function(event: JQueryEventObject){
                        event.stopPropagation();
                        let $this: JQuery = $(this);
                        let product: Product = $(this).data("product");
                        productListingOption.onBuyNowElementClicked(event, product, $this);
                    });
                }
             } catch (error) {
                console.debug(error);
            }
        });
    }
}