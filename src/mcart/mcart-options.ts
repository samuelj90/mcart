export interface MCartOptions {
    productListing: ProductListingOptions | null;
    minCart: MiniCartOptions;
    cartPage: CartPageOptions;
    confirmationPage: ConfirmationPageOptions;
}

export interface ProductListingOptions {
    appendElement?: JQuery;
    template?: (product: Product) => string;
    products: Product[]
    addToCartBtnEnabled: boolean;
    addToCartBtnElementSelector?: JQuery;
    addToCartBtnClickCallbackFn?: () => void;
    buyNowBtnEnabled: boolean;
    buyNowBtnElementSelector?: string;
    buyNowBtnClickCallbackFn?: () => void;
    beforeProductListingCallbackFn?: () => void;
    afterProductListingCallbackFn?: () => void;
}

export interface MiniCartOptions {
    template?: string;
    appendElement?: JQuery;
    miniCartViewCartEnabled?: boolean;
    miniCartProceedToCheckout?: boolean;
}

export interface Product {
    title: string;
    description: string;
    price: number;
    productFeaturedImage: string;
    productImages: string[];
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