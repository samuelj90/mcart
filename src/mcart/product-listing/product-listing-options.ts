import { Product } from "./product";

export interface ProductListingOptions {
    appendElement?: JQuery;
    replaceAppendElementContents: boolean;
    template?: (productListingOptions: ProductListingOptions, product: Product) => string;
    products: Product[]
    addToCartBtnEnabled: boolean;
    addToCartBtnLabel: string;
    addToCartBtnElementClass?: string;
    addToCartBtnClickCallbackFn?: (event) => void;
    buyNowBtnEnabled: boolean;
    buyNowBtnElementClass?: string;
    buyNowBtnClickCallbackFn?: (event) => void;
    buyNowBtnLabel: string;
    currencyLabel: string;
    beforeProductListingCallbackFn?: (productListingOptions: ProductListingOptions) => void;
    afterProductListingCallbackFn?: (productListingOptions: ProductListingOptions) => void;
}