import { CartItem } from "./cart-item";
import { Product } from "../product-listing/product";

export class Cart {
    private static remoteSyncingURLs: any;
    private static remoteSyncingEnabled: boolean;
    private static localSyncingEnabled: boolean;
    public static cartItems: CartItem[]
    constructor() {
        // TODO retrive items from local storage if localSyncingEnabled is enabled
        if (Cart.localSyncingEnabled) {
            this.retriveCartItemsFromStorage();
        }
        // otherwise initialize cartItems as an empty array
    }
    public insertProductToCart(product: Product, count: number) {
        // TODO insert a product into cart

        // if localSyncingEnabled
        if (Cart.localSyncingEnabled) {
            this.saveCartItemsIntoStorage();
        }
    }
    public removeProductFromCart(product: Product, count: number) {
        // TODO remove a product from cart

        // if localSyncingEnabled
        if (Cart.localSyncingEnabled) {
            this.saveCartItemsIntoStorage();
        }
    }
    private retriveCartItemsFromStorage() {
        // if remoteSyncingEnabled
        if (Cart.remoteSyncingEnabled) {
            // try to load all cartItems from server using getCartItemsURL
            // and set it into local storage.
        }
        // load items from local storage
    }
    private saveCartItemsIntoStorage() {
        // if localSyncingEnabled
        if (Cart.localSyncingEnabled) {
            // save cartItems into Local storage
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
}