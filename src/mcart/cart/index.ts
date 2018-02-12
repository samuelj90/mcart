import { CartItem } from "./cart-item";
import { Product } from "../product-listing/product";
import { BehaviorSubject } from "rxjs"
import { CANCELLED } from "dns";
import { error } from "util";
import { isNullOrUndefined } from "../utils";
import { CartOptions } from "./cart-options";
export class Cart {
    private static remoteSyncingURLs: any;
    private static remoteSyncingEnabled: boolean;
    private static localSyncingEnabled: boolean;
    private static cartItems: CartItem[];
    private static cartItemsSubject: BehaviorSubject<CartItem[]>;
    constructor() {
        Cart.initializeCart();
    }
    private static initializeCart() {
        // TODO retrive items from local storage if localSyncingEnabled is enabled
        Cart.cartItems = [];
        if (Cart.localSyncingEnabled) {
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
        if (Cart.localSyncingEnabled) {
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
        if (Cart.localSyncingEnabled) {
            Cart.saveCartItemsIntoStorage();
        }
    }
    public static removeProductFromCart(product: Product, count: number = -1) {
    }
    private static retriveCartItemsFromStorage(): CartItem[] {
        // if remoteSyncingEnabled
        if (Cart.remoteSyncingEnabled) {
            // try to load all cartItems from server using getCartItemsURL
            // and set it into local storage.
        }
        let cartItems: CartItem[] = <CartItem[]> JSON.parse(localStorage.getItem("cartItems"));
        return cartItems;
        // load items from local storage
    }
    private static saveCartItemsIntoStorage() {
        // if localSyncingEnabled
        if (Cart.localSyncingEnabled) {
            // save cartItems into Local storage
            localStorage.setItem("cartItems", JSON.stringify(Cart.cartItems));
        }
        // if remoteSyncingEnabled
        if (Cart.remoteSyncingEnabled) {
            // try to save cartItems into server using setCartItemsURL
        }
    }
    public static enableLocalSyncing() {
        this.localSyncingEnabled = true;
    }
    public static disableLocalSyncing() {
        this.localSyncingEnabled = false;
    }
    public static enableRemoteSyncing(remoteSyncingURLs) {
        this.remoteSyncingEnabled = true;
        this.remoteSyncingURLs = remoteSyncingURLs
    }
    public static disableRemoteSyncing() {
        this.remoteSyncingEnabled = false;
    }
    public getCartItems(): CartItem[] {
        return Cart.cartItems;
    }
    public getCartItemsSubject(): BehaviorSubject<CartItem[]> {
        return Cart.cartItemsSubject;
    }
}