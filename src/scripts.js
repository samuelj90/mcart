$(function () {
    $("body").mCart({
        cart: {},
        miniCart: [{
            renderToElement: $('#minicart-container'),
            replaceRenderToElementContent: true
        }],
        productListing: [{
            renderToElement: $('#productlisting-container'),
            replaceRenderToElementContent: true
        }],
        cartPage: {
            renderToElement: $('#cartpage-container'),
            replaceRenderToElementContent: true
        }
    });
});