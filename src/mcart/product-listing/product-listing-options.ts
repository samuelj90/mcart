import { Product } from "./product";

export interface ProductListingOptions {
    appendElement?: JQuery;
    replaceAppendElementContents: boolean;
    template?: (productListingOptions: ProductListingOptions, product: Product) => string;
    products: Product[]
    addToCartBtnEnabled: boolean;
    addToCartBtnLabel: string;
    addToCartBtnElementClass?: string;
    onAddToCartBtnClicked?: (event, product: Product) => void;
    buyNowBtnEnabled: boolean;
    buyNowBtnElementClass?: string;
    onBuyNowBtnClicked?: (event) => void;
    buyNowBtnLabel: string;
    currencyLabel: string;
    beforeProductListing?: (productListingOptions: ProductListingOptions) => void;
    afterProductListing?: (productListingOptions: ProductListingOptions) => void;
}