import { ICartModel } from "./cart-model";
import { ICartOptions } from "./cart-options";

export const defaultCartOptions: ICartOptions = {
    calculateShippingCharge: (cartModel: ICartModel): number => {
        return 0;
    },
    calculateTaxAmount: (cartModel: ICartModel): number => {
        return (cartModel.cartItemsTotal / 10);
    },
    localSyncingEnabled: true,
    remoteSyncingEnabled: false,
};
