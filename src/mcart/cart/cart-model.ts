import { ICartItem } from "./cart-item";

export interface ICartModel {
    cartItems: ICartItem[];
    cartItemsTotal: number;
    shippingDetails: any;
    couponDetails: any;
    taxAmount: number;
    errors?: any;
}
