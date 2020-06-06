import { ICartModel } from "./cart-model";
export interface ICartOptions {
    localSyncingEnabled: boolean;
    remoteSyncingEnabled: boolean;
    calculateShippingCharge?: (cartModel: ICartModel) => number;
    calculateTaxAmount?: (cartModel: ICartModel) => number;
}
