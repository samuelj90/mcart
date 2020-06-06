import { OrderStatus } from "./order-status";

export interface IOrderModel {
    orderItems?;
    shippingDetails?;
    couponDetails?;
    orderId: number;
    orderStatus?: OrderStatus;
    taxAmount?: number;
}
