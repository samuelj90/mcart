import { Product } from "./product";

export interface ProductListingOption {
    renderToElement?: JQuery;
    replaceRenderToElementContent: boolean;
    endpoints: {[key: string]: string};
    template: string;
    products: Product[];
    addToCartElement?: string;
    onAddToCartElementClicked?: (productListingOptions: ProductListingOption, event, product: Product, $this: JQuery) => void;
    buyNowElement?: string;
    onBuyNowElementClicked?: (productListingOptions: ProductListingOption, event, product: Product, $this: JQuery) => void;
}