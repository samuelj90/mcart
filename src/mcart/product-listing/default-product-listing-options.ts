import { ProductListingOption } from "./product-listing-option";
import { productListingTemplate } from "./product-listing-template";
import { Product } from "./product";
import { products } from "./proudct-list";
const productListingOption: ProductListingOption = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: productListingTemplate,
    products: products,
    addToCartElement: "",
    onAddToCartElementClicked: (event, product: Product, $this: JQuery) => {},
    buyNowElement: "",
    onBuyNowElementClicked: (event, product: Product, $this: JQuery) => {}
};

export const defaultProductListingOption = productListingOption;