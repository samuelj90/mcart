import { MiniCartOptions } from "./mini-cart-options";
import { isNullOrUndefined } from "src/mcart/utils";
import { Cart } from "../cart/cart";
import { CartItem } from "../cart/cart-item";
export class MiniCart extends Cart {
    private template: string;
    private cartItemTemplate: string;
    constructor(private miniCartOptions: MiniCartOptions) {
        super();
        if (isNullOrUndefined(miniCartOptions)) {
            throw new Error("miniCartOptions may not be empty!");
        }
        this.initializeMiniCart();
    }
    public initializeMiniCart() {
        let cartItems = Cart.cartItems;
        let cartItemsCount: number = cartItems.length;
        this.template = this.getMiniCartTemplate(this.miniCartOptions, cartItemsCount);

        if (cartItemsCount >= 1) {
            cartItems.forEach((cartItem, index, cartItems) => {
                this.getCartItemTemplate(this.miniCartOptions, cartItem, index, cartItems);
            })
        }
    }

    private getMiniCartTemplate(miniCartOptions: MiniCartOptions, cartItemsCount: number): string {
        if (isNullOrUndefined(miniCartOptions.template)) {
            return ``;
        }
        return miniCartOptions.template(miniCartOptions, cartItemsCount);
    }

    private getCartItemTemplate(miniCartOptions: MiniCartOptions, cartItem: CartItem, index: number, cartItems: CartItem[]): string {
        if (isNullOrUndefined(miniCartOptions.cartItemTemplate)) {
            return ``;
        }
        return miniCartOptions.cartItemTemplate(miniCartOptions, cartItem, index, cartItems);
    }
    // TODO create observer subscriber pattern for linkBtn CartItemsCount
}