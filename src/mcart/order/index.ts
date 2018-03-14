import { OrderStatus } from "./order-status";

export class Order {
    private static instance: Order;
    private static readonly ORDER_LOCAL_STORAGE_KEY = "mcart-orderinstance";
    private orderItems;
    private shippingDetails;
    private couponDetails;
    private orderId: number;
    private orderStatus: OrderStatus = OrderStatus.OPEN;
    private taxAmount: number;
    private constructor() {
        let orderInstance = loadFromLocalStorage();
    }
    setOrderId(orderId: number): any {
       this.orderId = orderId;
    }
    saveToLocalStorage(order: Order) {
        localStorage.setItem(Order.ORDER_LOCAL_STORAGE_KEY, JSON.stringify(order));
    }
    loadFromLocalStorage(): Order {
        return JSON.parse(localStorage.getItem(Order.ORDER_LOCAL_STORAGE_KEY));
    }
    public static getInstance() {
        return this.instance || (this.instance = new this());
    }
}