import { CartModel } from "./cart-model";
import { CartOptions } from "./cart-options";

export const defaultCartOptions: CartOptions = {
    localSyncingEnabled: true,
    remoteSyncingEnabled: false,
    calculateShippingCharge: (cartModel: CartModel): number => {
        return 0;
    },
    calculateTaxAmount: (cartModel: CartModel): number => {
        return (cartModel.cartItemsTotal / 10);
    }
};