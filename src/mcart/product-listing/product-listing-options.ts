import { ProductListingTemplateOptions } from "./product-listing-template-options";
import { Product } from "./product";

export interface ProductListingOptions {
    renderTo?: JQuery;
    replaceRenderToContents: boolean;
    // TODO: Implement some methods to validate templateOptions is valid wrto template.
    templateOptions: ProductListingTemplateOptions;
    // TODO : Accept REST endpoint to load Products.
    endpoints?: {
        getProducts: string
    }
    products?: Product[];
    onAddToCartBtnClicked?: (event, product: Product) => void;
    onBuyNowBtnClicked?: (event) => void;
    beforeProductListing?: (productListingOptions: ProductListingOptions) => void;
    afterProductListing?: (productListingOptions: ProductListingOptions) => void;
}