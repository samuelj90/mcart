import { OrderStatus } from "./order-status";

export interface OrderModel {
    orderItems?;
    shippingDetails?;
    couponDetails?;
    orderId: number;
    orderStatus?: OrderStatus;
    taxAmount?: number;
}