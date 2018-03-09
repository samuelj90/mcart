import { CartItem } from "./cart-item";

export interface CartModel {
    cartItems: CartItem[];
    cartItemsTotal: number;
    shippingDetails: any;
    couponDetails: any;
    taxAmount: number;
}