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
    title: string;
    description: string;
    price: number;
    beforeProductAdded?: () => void;
    afterProductAdded?: () => void;
    additionalFields: any;
}

export interface CartPageOptions {
    beforeCartItemIncremented?: () => void;
    afterCartItemIncremented?: () => void;
    beforeCartItemDecremented?: () => void;
    afterCartItemDecremented?: () => void;
    beforeCheckoutClicked?: () => void;
    afterCheckoutClicked?: () => void;
    couponCodeImplementation?: () => void;
    beforeApplyCouponCode?: () => void;
    afterCouponCodeApplied?: () => void;
}
export interface ConfirmationPageOptions {

}