import { IProduct } from "./product";

export interface IProductListingOption {
    renderToElement?: JQuery;
    replaceRenderToElementContent: boolean;
    endpoints: { [key: string]: string };
    template: string;
    products: IProduct[];
    addToCartElement?: string;
    onAddToCartElementClicked?: (
        productListingOptions: IProductListingOption, event, product: IProduct, $this: JQuery,
    ) => void;
    buyNowElement?: string;
    onBuyNowElementClicked?: (
        productListingOptions: IProductListingOption, event, product: IProduct, $this: JQuery,
    ) => void;
}
