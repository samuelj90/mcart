import { ProductListingOption } from "./product-listing-option";
import { productListingTemplate } from "./product-listing-template";
import { Product } from "./product";
import { products } from "./proudct-list";
import { Cart } from "../cart";
const productListingOption: ProductListingOption = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: productListingTemplate,
    products: products,
    addToCartElement: ".mcart-productlisting-addtocart",
    onAddToCartElementClicked: (event, product: Product, $this: JQuery) => {
        $this.data("product");
        Cart.insertProductToCart(product, 1);
    },
    buyNowElement: ".mcart-productlisting-buynow",
    onBuyNowElementClicked: (event, product: Product, $this: JQuery) => {
        $this.data("product");
        Cart.insertProductToCart(product, 1);
        window.location.href = "/cart";
    }
};

export const defaultProductListingOption = productListingOption;