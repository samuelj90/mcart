import * as ejs from "ejs";
import { RenderToElementNotFound } from "../render-to-element-notfound";
import { defaultProductListingOption } from "./default-product-listing-options";
import { IProduct } from "./product";
import { IProductListingOption } from "./product-listing-option";
export class ProductListing {
    constructor(productListingOptions: IProductListingOption[]) {
        this.renderProductListing(productListingOptions);
    }
    private renderProductListing(productListingOptions: IProductListingOption[]) {
        productListingOptions.
            forEach(
                (
                    productListingOption: IProductListingOption) => {
                    try {
                        if (productListingOption.renderToElement.length <= 0) {
                            throw new RenderToElementNotFound(productListingOption.renderToElement, "renderToElement of product listing is not found in DOM");
                        }
                        productListingOption = $.extend({}, defaultProductListingOption, productListingOption);
                        if (productListingOption.replaceRenderToElementContent) {
                            productListingOption.renderToElement.html("");
                        }
                        const products: IProduct[] = productListingOption.products;
                        const templateData = {
                            products,
                        };
                        if (!!productListingOption.addToCartElement) {
                            productListingOption.renderToElement.off("click", productListingOption.addToCartElement);
                        }
                        if (!!productListingOption.buyNowElement) {
                            productListingOption.renderToElement.off("click", productListingOption.buyNowElement);
                        }
                        const template = ejs.compile(productListingOption.template)(templateData);
                        productListingOption.renderToElement.append(template);
                        if (!!productListingOption.addToCartElement) {
                            productListingOption.
                                renderToElement.
                                on("click", productListingOption.addToCartElement, (event: JQueryEventObject) => {
                                    event.stopPropagation();
                                    const $this: JQuery = $(this);
                                    const product: IProduct = $(this).data("product");
                                    productListingOption.
                                        onAddToCartElementClicked(productListingOption, event, product, $this);
                                });
                        }
                        if (!!productListingOption.buyNowElement) {
                            productListingOption.
                                renderToElement.
                                on("click", productListingOption.buyNowElement, (event: JQueryEventObject) => {
                                    event.stopPropagation();
                                    const $this: JQuery = $(this);
                                    const product: IProduct = $(this).data("product");
                                    productListingOption.
                                        onBuyNowElementClicked(productListingOption, event, product, $this);
                                });
                        }
                        // tslint:disable-next-line:no-empty
                    } finally { }
                });
    }
}
