import { Product } from "./product";

export interface ProductListingOption {
    renderToElement?: JQuery;
    replaceRenderToElementContent: boolean;
    template: string;
    products: Product[];
    addToCartElement?: string;
    onAddToCartElementClicked?: (event, product: Product, $this: JQuery) => void;
    buyNowElement?: string;
    onBuyNowElementClicked?: (event, product: Product, $this: JQuery) => void;
}