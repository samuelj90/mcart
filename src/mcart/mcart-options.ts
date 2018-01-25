export interface MCartOptions {
    productListing: ProductListingOptions;
    minCart: MiniCartOptions;
    cartPage: CartPageOptions;
    confirmationPage: ConfirmationPageOptions;
}

export interface ProductListingOptions {
    enabled: boolean;
    appendElement?: JQuery;
    template?: string;
    products: Product[]
    addToCartBtnEnabled: boolean;
    addToCartBtnElementSelector?: string;
    addToCartBtnClickCallbackFn?: () => void;
    buyNowBtnEnabled: boolean;
    buyNowBtnElementSelector?: string;
    buyNowBtnClickCallbackFn?: () => void;
    beforeProductListingCallbackFn?: () => void;
    afterProductListingCallbackFn?: () => void;
}

export interface MiniCartOptions {
    enabled: boolean;
    template?: string;
    appendElement?: JQuery;
    miniCartViewCartEnabled?: boolean;
    miniCartProceedToCheckout?: boolean;
}

export interface Product {

}

export interface CartPageOptions {

}
export interface ConfirmationPageOptions {

}