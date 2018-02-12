import { defaultCartOptions } from "./default-cart-options";
import { CartItem } from "./cart-item";
import { Product } from "../product-listing/product";
import { BehaviorSubject } from "rxjs"
import { error } from "util";
import { isNullOrUndefined } from "../utils";
import { CartOptions } from "./cart-options";
export class Cart {

    private static cartItems: CartItem[];
    private static cartItemsSubject: BehaviorSubject<CartItem[]>;
    private static cartOptions: CartOptions;
    constructor(cartOptions?: CartOptions) {
        if (!isNullOrUndefined(Cart.cartItems)) {
            return;
        }
        Cart.cartOptions = $.extend({}, defaultCartOptions, cartOptions);
        Cart.initializeCart();
    }
    private static initializeCart() {
        // TODO retrive items from local storage if localSyncingEnabled is enabled
        Cart.cartItems = [];
        if (Cart.cartOptions.localSyncingEnabled) {
            Cart.cartItems = Cart.retriveCartItemsFromStorage();
            if (isNullOrUndefined(Cart.cartItems)) {
                Cart.cartItems = [];
            }
        }
        Cart.cartItemsSubject = new BehaviorSubject(Cart.cartItems);
        // otherwise initialize cartItems as an empty array
    }
    public static upateBehaviourSubjectAndSyncing() {
        Cart.cartItemsSubject.next(Cart.cartItems);
        // if localSyncingEnabled
        if (Cart.cartOptions.localSyncingEnabled) {
            Cart.saveCartItemsIntoStorage();
        }
    }
    public static insertProductToCart(product: Product, count: number = 1) {
        // TODO insert a product into cart
        console.log(Cart.cartItems);
        if (isNullOrUndefined(Cart.cartItems)) {
            Cart.initializeCart();
        } else {
            const isItemExist: boolean = Cart.cartItems.map((value: CartItem, index: number, cartItems: CartItem[]) => {
                if (value.title === product.title ) {
                    value.quantity = value.quantity + count;
                    return true;
                }
                return false
            }).reduce(function(pre, cur) {return pre || cur}, false);
            if (isItemExist) {
                Cart.upateBehaviourSubjectAndSyncing();
                return;
            }
        }
        const cartItem: CartItem = {
            title: product.title,
            item: product,
            quantity: count
        }
        this.cartItems.push(cartItem);
        Cart.upateBehaviourSubjectAndSyncing();
    }
    public static removeCartItemFromCart(cartItem: CartItem) {
        Cart.cartItems = Cart.cartItems.filter(value => value.title !== cartItem.title);
        Cart.cartItemsSubject.next(Cart.cartItems);
        // if localSyncingEnabled
        if (Cart.cartOptions.localSyncingEnabled) {
            Cart.saveCartItemsIntoStorage();
        }
    }
    public static removeProductFromCart(product: Product, count: number = -1) {
    }
    private static retriveCartItemsFromStorage(): CartItem[] {
        // if remoteSyncingEnabled
        if (Cart.cartOptions.remoteSyncingEnabled) {
            // try to load all cartItems from server using getCartItems
            // and set it into local storage.
        }
        let cartItems: CartItem[] = <CartItem[]> JSON.parse(localStorage.getItem("cartItems"));
        return cartItems;
        // load items from local storage
    }
    private static saveCartItemsIntoStorage() {
        // if localSyncingEnabled
        if (Cart.cartOptions.localSyncingEnabled) {
            // save cartItems into Local storage
            localStorage.setItem("cartItems", JSON.stringify(Cart.cartItems));
        }
        // if remoteSyncingEnabled
        if (Cart.cartOptions.remoteSyncingEnabled) {
            // try to save cartItem into server using addItemToCart
        }
    }
    public getCartItems(): CartItem[] {
        return Cart.cartItems;
    }
    public getCartItemsSubject(): BehaviorSubject<CartItem[]> {
        return Cart.cartItemsSubject;
    }
}