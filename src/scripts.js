$(function () {
    $("body").mCart({
        cart: {

        },
        miniCart: {
            renderTo: $('#minicart-container'),
            replaceRenderToContents: true
        },
        productListing: {
            renderTo: $('#product-listing-container'),
            replaceRenderToContents: true,
            endpoints : {
                getProducts: "/lib/proudcts.json"
            },
            templateOptions: {
                template: function (productListingTemplateOptions, product) {
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
                                 <button class="${productListingTemplateOptions.buyNowBtnElementClass}">${productListingTemplateOptions.buyNowBtnLabel}</button>
                                 <button class="${productListingTemplateOptions.addToCartBtnElementClass}">${productListingTemplateOptions.addToCartBtnLabel}</button>  
                            </div>
                        </div>
                    `;
                },
                addToCartBtnLabel: 'add to cart',
                buyNowBtnLabel: 'buy now',
                prependCurrency: true,
            },
            onAddToCartBtnClicked: function (event, product) {
                console.log('ADD TO CART Button Clicked');
                console.log(event, product)
            },
            onBuyNowBtnClicked: function (event) {
                console.log('BUY NOW Button Clicked');
                console.log(event)
            },
            beforeProductListing: function (productListingOptions) {
                console.log('Before Product Listing');
            },
            afterProductListing: function (productListingOptions) {
                console.log('After Product Listing');
            },
        }
    });
});