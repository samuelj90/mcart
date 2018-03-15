import { OrderStatus } from "./order-status";
import { OrderModel } from "./order-model";
import { isNullOrUndefined } from "util";
import { OrderOptions } from "./order-options";
import { defaultOrderOptions } from "./default-order-options";

export class Order {
    private static instance: Order;
    private orderId: number;
    private static readonly ORDER_LOCAL_STORAGE_KEY = "mcart-orderinstance";
    private constructor(private oderOptions: OrderOptions) {
        this.oderOptions = $.extend({}, defaultOrderOptions, oderOptions);
    }
    public setOrderId(orderId) {
        localStorage.setItem(Order.ORDER_LOCAL_STORAGE_KEY, orderId + "");
    }
    public getOrderId() {
        return localStorage.getItem(Order.ORDER_LOCAL_STORAGE_KEY);
    }
    public static getInstance(oderOptions?: OrderOptions) {
        return this.instance || (this.instance = new this(oderOptions));
    }
}