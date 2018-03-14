import { OrderStatus } from "./order-status";

export class Order {
    private static instance: Order;
    public ORDER_LOCAL_STORAGE_KEY = "";
    public orderItems;
    public shippingDetails;
    public couponDetails;
    public orderId;
    public orderStatus: OrderStatus = OrderStatus.Open;
    public taxAmount: number;
    private constructor() {
    }
    public static getInstance() {
        return this.instance || (this.instance = new this());
    }
}