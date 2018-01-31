$(function () {
    $("body").mCart({
        miniCart: {
            appendElement:$('#minicart-container')
        },
        productListing: {
            appendElement: $('#product-listing-container'),
            addToCartBtnElementClass: 'add-to-cart-btn',
            buyNowBtnElementClass: 'buy-now-btn',
            template: function (productListingOptions, product) {
                return `
                <div class="product">
                    <div class="wrapper">
                        <div class="image">
                            <img src="${product.featuredImage}">
                        </div>
                        <span class="price"> ${productListingOptions.currencyPrependLabel} ${product.price} ${productListingOptions.currencyAppendLabel}</span>
                        <h5> ${product.title} </h5>
                        <p>${product.description}</p>
                        <button class="${productListingOptions.addToCartBtnElementClass}">${productListingOptions.addToCartBtnLabel}</button>
                        <button class="${productListingOptions.buyNowBtnElementClass}">${productListingOptions.buyNowBtnLabel}</button>
                    </div>
                </div>
                `;
            },
            onAddToCartBtnClicked: function(event, product) {
                console.log('ADD TO CART Button Clicked');
                console.log(event, product) 
            },
            onBuyNowBtnClicked: function(event) {
                console.log('BUY NOW Button Clicked');
                console.log(event)
            },
            beforeProductListing: function(productListingOptions) {
                console.log('Before Product Listing');
            },
            afterProductListing: function(productListingOptions) {
                console.log('After Product Listing');
            },
            replaceAppendElementContents: true,
            addToCartBtnLabel: 'ADD TO CART',
            buyNowBtnLabel: 'BUY NOW',
            currencyPrependLabel: '',
            currencyAppendLabel: '$',
            products: [{
                    title: "TEST1",
                    description: "TEST DESCRIPTION",
                    price: 200.00,
                    featuredImage:'http://via.placeholder.com/200x250',
                },
                {
                    title: "TEST2",
                    description: "TEST DESCRIPTION",
                    price: 200.00,
                    featuredImage:'http://via.placeholder.com/200x250',
                },
                {
                    title: "TEST3",
                    description: "TEST DESCRIPTION",
                    price: 200.00,
                    featuredImage:'http://via.placeholder.com/200x250',
                },
                {
                    title: "TEST4",
                    description: "TEST DESCRIPTION",
                    price: 200.00,
                    featuredImage:'http://via.placeholder.com/200x250',
                },
                {
                    title: "TEST5",
                    description: "TEST DESCRIPTION",
                    price: 200.00,
                    featuredImage:'http://via.placeholder.com/200x250',
                },
                {
                    title: "TEST6",
                    description: "TEST DESCRIPTION",
                    price: 200.00,
                    featuredImage:'http://via.placeholder.com/200x250',
                },
                {
                    title: "TEST7",
                    description: "TEST DESCRIPTION",
                    price: 200.00,
                    featuredImage:'http://via.placeholder.com/200x250',
                },
                {
                    title: "TEST8",
                    description: "TEST DESCRIPTION",
                    price: 250.00,
                    featuredImage:'http://via.placeholder.com/200x250'
                }
            ]
        }
    });
});