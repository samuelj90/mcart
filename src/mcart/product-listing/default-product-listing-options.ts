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
    endpoints: {
        cartPageUrl: "/cart.html"
    },
    addToCartElement: ".mcart-productlisting-addtocart",
    onAddToCartElementClicked: (productListingOptions, event, product: Product, $this: JQuery) => {
        $this.data("product");
        Cart.getInstance().insertProductToCart(product, 1);
    },
    buyNowElement: ".mcart-productlisting-buynow",
    onBuyNowElementClicked: (productListingOptions, event, product: Product, $this: JQuery) => {
        $this.data("product");
        Cart.getInstance().insertProductToCart(product, 1);
        window.location.href = "/cart";
    }
};

export const defaultProductListingOption = productListingOption;