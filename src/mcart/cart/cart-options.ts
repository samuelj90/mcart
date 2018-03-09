import { CartModel } from "./cart-model";
export interface CartOptions {
    localSyncingEnabled: boolean;
    remoteSyncingEnabled: boolean;
    calculateShippingCharge?: (cartModel: CartModel) => number;
    calculateTaxAmount?: (cartModel: CartModel) => number;
}