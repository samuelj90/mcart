import { ProductListingOptions } from "./product-listing-options";
const productListingOptions: ProductListingOptions = {
    "renderTo": jQuery("body"),
    "replaceRenderToContents": false,
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
    },
    "products": [{
        "id": 1,
        "sku": "",
        "identifier": "Soda Water - Club Soda, 355 Ml",
        "title": "Nantucket Orange Juice",
        "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum.",
        "price": 514,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 2,
        "sku": "̦",
        "identifier": "Bouillion - Fish",
        "title": "Wine - Niagara Peninsula Vqa",
        "description": "Vivamus tortor. Duis mattis egestas metus.",
        "price": 390,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 3,
        "sku": "",
        "identifier": "Ginger - Crystalized",
        "title": "Ginger - Crystalized",
        "description": "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.",
        "price": 140,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 4,
        "sku": "",
        "identifier": "Muffin Chocolate Individual Wrap",
        "title": "V8 Pet",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
        "price": 111,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 5,
        "sku": "",
        "identifier": "Ginger - Fresh",
        "title": "Soup - Campbells Chili Veg",
        "description": "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
        "price": 148,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 6,
        "sku": "",
        "identifier": "Flour - Teff",
        "title": "Vanilla Beans",
        "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
        "price": 782,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 7,
        "sku": "",
        "identifier": "Stock - Beef, White",
        "title": "Lettuce - Red Leaf",
        "description": "Morbi non quam nec dui luctus rutrum.",
        "price": 435,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 8,
        "sku": "",
        "identifier": "Crab - Soft Shell",
        "title": "Lamb - Rack",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
        "price": 935,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 9,
        "sku": "",
        "identifier": "Shrimp - Black Tiger 6 - 8",
        "title": "Molasses - Fancy",
        "description": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        "price": 209,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }, {
        "id": 10,
        "sku": "",
        "identifier": "Muffin Mix - Oatmeal",
        "title": "Foam Cup 6 Oz",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
        "price": 247,
        "featuredImage": "http://via.placeholder.com/200x250",
        "images": [],
        "currency": "₹"
    }]
};

export const defaultProductListingOptions = productListingOptions;