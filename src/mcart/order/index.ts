import { defaultOrderOptions } from "./default-order-options";
import { IOrderOptions } from "./order-options";

export class Order {
    public static getInstance(oderOptions?: IOrderOptions) {
        return this.instance || (this.instance = new this(oderOptions));
    }
    private static instance: Order;
    private static readonly ORDER_LOCAL_STORAGE_KEY = "mcart-orderinstance";
    private orderId: number;
    private constructor(private oderOptions: IOrderOptions) {
        this.oderOptions = $.extend({}, defaultOrderOptions, oderOptions);
    }
    public setOrderId(orderId) {
        localStorage.setItem(Order.ORDER_LOCAL_STORAGE_KEY, orderId + "");
    }
    public getOrderId() {
        return localStorage.getItem(Order.ORDER_LOCAL_STORAGE_KEY);
    }
}
