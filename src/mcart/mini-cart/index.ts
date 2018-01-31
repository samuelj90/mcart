import { MiniCartOptions } from "./mini-cart-options";
import { isNullOrUndefined } from "../utils";
import { Cart } from "../cart/cart";
import { CartItem } from "../cart/cart-item";
import { Observable } from "rxjs/Observable";
export class MiniCart extends Cart {
    private template: string;
    private cartItemTemplate: string;
    private cartItemObservable: Observable<CartItem[]>;
    constructor(private miniCartOptions: MiniCartOptions) {
        super();
        if (isNullOrUndefined(miniCartOptions)) {
            throw new Error("miniCartOptions may not be empty!");
        }
        this.cartItemObservable = this.getCartItemsSubject().asObservable();
        this.initializeMiniCart();
        const behaviourSubject = this.getCartItemsSubject();
        const self = this;
            behaviourSubject.subscribe(
                function(cartItems: CartItem[]) {
                    self.renderMiniCartItems(miniCartOptions, cartItems);
                },
                function(error) {
                    console.log("Error", error);
                },
                function() {
                    console.log("Completed");
                }
            );
            console.log(behaviourSubject.observers);
    }
    renderMiniCartItems(miniCartOptions: MiniCartOptions, cartItems: CartItem []): any {
        console.log(cartItems);
    }
    public initializeMiniCart() {
        let cartItems: CartItem[] = this.getCartItems();
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