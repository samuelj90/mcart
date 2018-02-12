import { ProductListingOptions } from "./product-listing-options";
const productListingOptions: ProductListingOptions = {
    "renderTo": jQuery("body"),
    "replaceRenderToContents": false,
    "endpoints" : {
        "getProducts": "/lib/proudcts.json"
    },
    "templateOptions": {
        "template": function (productListingTemplateOptions, product) {
            let priceAppendLabel = product.currency,
                pricePrependLabel = "";
            if (productListingTemplateOptions.prependCurrency) {
                pricePrependLabel = product.currency;
                priceAppendLabel = ""
            }
            return `
            <div class="product">
                <div class="wrapper">
                    <div class="image">
                        <img src="${product.featuredImage}">
                    </div>
                    <span class="price"> ${pricePrependLabel} ${product.price} ${priceAppendLabel}</span>
                    <h5> ${product.title} </h5>
                    <p>${product.description}</p>
                    <button class="${productListingTemplateOptions.addToCartBtnElementClass}">${productListingTemplateOptions.addToCartBtnLabel}</button>
                    <button class="${productListingTemplateOptions.buyNowBtnElementClass}">${productListingTemplateOptions.buyNowBtnLabel}</button>
                </div>
            </div>
            `;
        },
        "addToCartBtnEnabled": true,
        "addToCartBtnLabel": "ADD TO CART",
        "addToCartBtnElementClass": "add-to-cart-btn",
        "buyNowBtnEnabled": true,
        "buyNowBtnLabel": "BUY NOW",
        "prependCurrency": true,
        "buyNowBtnElementClass": "buy-now-btn",
    }
};

export const defaultProductListingOptions = productListingOptions;