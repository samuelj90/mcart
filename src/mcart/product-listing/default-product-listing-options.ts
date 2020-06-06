import { Cart } from "../cart";
import { IProduct } from "./product";
import { IProductListingOption } from "./product-listing-option";
import { productListingTemplate } from "./product-listing-template";
import { products } from "./proudct-list";
const productListingOption: IProductListingOption = {
    addToCartElement: ".mcart-productlisting-addtocart",
    buyNowElement: ".mcart-productlisting-buynow",
    endpoints: {
        cartPageUrl: "/cart.html",
    },
    onAddToCartElementClicked: (productListingOptions, event, product: IProduct, $this: JQuery) => {
        $this.data("product");
        Cart.getInstance().insertProductToCart(product, 1);
    },
    onBuyNowElementClicked: (productListingOptions, event, product: IProduct, $this: JQuery) => {
        $this.data("product");
        Cart.getInstance().insertProductToCart(product, 1);
        window.location.href = "/cart";
    },
    products,
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: productListingTemplate,
};

export const defaultProductListingOption = productListingOption;
