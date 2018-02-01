import { Product } from "./product";
export interface ProductListingTemplateOptions {
    template?: (productListingTemplateOptions: ProductListingTemplateOptions, product: Product) => string;
    addToCartBtnEnabled: boolean;
    addToCartBtnLabel: string;
    addToCartBtnElementClass?: string;
    buyNowBtnEnabled: boolean;
    buyNowBtnLabel: string;
    buyNowBtnElementClass?: string;
    prependCurrency?: boolean;
}