import { defaultCartOptions } from "./default-cart-options";
import { CartItem } from "./cart-item";
import { Product } from "../product-listing/product";
import { BehaviorSubject } from "rxjs";
import { error } from "util";
import { isNullOrUndefined } from "../utils";
import { CartOptions } from "./cart-options";
import { CartModel } from "./cart-model";
export class Cart {
    private static instance: Cart;
    // private cartModel: CartModel;
    private cartModelSubject: BehaviorSubject<CartModel>;
    private cartOptions: CartOptions;
    CART_MODEL_LOCAL_STORAGE_KEY = "mcart-cart-model";

    private constructor(cartOptions?: CartOptions) {
        if (!isNullOrUndefined(this.cartModelSubject)) {
            return;
        }
        this.cartOptions = $.extend({}, defaultCartOptions, cartOptions);
        this.initializeCart();
    }

    public static getInstance(cartOptions?: CartOptions): Cart {
        return this.instance || (this.instance = new this(cartOptions));
    }

    private initializeCart() {
        // TODO retrive items from local storage if localSyncingEnabled is enabled
        let cartModel: CartModel = {
            cartItems: [],
            cartItemsTotal: 0,
            shippingDetails: {
                shippingCharge: 0
            },
            couponDetails: {},
            taxAmount: 0
        };
        if (this.cartOptions.localSyncingEnabled) {
            let cartModelFromStorage = this.retriveCartModelFromStorage();
            if (! isNullOrUndefined(cartModelFromStorage)) {
                cartModel = cartModelFromStorage;
                this.cartModelSubject = new BehaviorSubject(cartModel);
                return;
            }
        }
        this.cartModelSubject = new BehaviorSubject(cartModel);
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }

    public upateBehaviourSubjectAndSyncing(cartModel: CartModel) {
        cartModel.taxAmount =  this.cartOptions.calculateTaxAmount(cartModel);
        this.cartModelSubject.next(cartModel);
        if (this.cartOptions.localSyncingEnabled) {
            this.saveCartModelIntoStorage(cartModel);
        }
    }
    public insertProductToCart(product: Product, count: number = 1) {
        let cartModel: CartModel = this.cartModelSubject.getValue();
        let changeInCartItemsTotal = 0;
        if (isNullOrUndefined(cartModel.cartItems)) {
            this.initializeCart();
        } else {
            const isItemExist: boolean = cartModel.cartItems.map((value: CartItem, index: number, cartItems: CartItem[]) => {
                if (value.id === product.id ) {
                    value.quantity = value.quantity + count;
                    changeInCartItemsTotal = changeInCartItemsTotal + (value.item.price * count);
                    return true;
                }
                return false;
            }).reduce(function(pre, cur) {return pre || cur; }, false);
            if (isItemExist) {
                cartModel.cartItemsTotal = cartModel.cartItemsTotal + changeInCartItemsTotal;
                this.upateBehaviourSubjectAndSyncing(cartModel);
                return;
            }
        }
        const cartItem: CartItem = {
            id: product.id,
            item: product,
            quantity: count
        };
        cartModel.cartItems.push(cartItem);
        changeInCartItemsTotal = (changeInCartItemsTotal + cartItem.item.price * count);
        cartModel.cartItemsTotal = cartModel.cartItemsTotal + changeInCartItemsTotal;
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }
    public removeCartItemFromCart(cartItem: CartItem) {
        let cartModel: CartModel = this.cartModelSubject.getValue();
        let cartItemsToRemove: CartItem[] = cartModel.cartItems.filter(value => value.id === cartItem.id);
        cartModel.cartItems = cartModel.cartItems.filter(value => value.id !== cartItem.id);
        let changeInCartItemsTotal = 0;
        cartItemsToRemove.forEach((cartItem: CartItem) => {
            changeInCartItemsTotal = changeInCartItemsTotal - (cartItem.quantity * cartItem.item.price);
        });
        cartModel.cartItemsTotal = cartModel.cartItemsTotal + changeInCartItemsTotal;
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }
    public removeProductFromCart(product: Product, count: number = 1) {
        let changeInCartItemsTotal = 0;
        let cartModel: CartModel = this.cartModelSubject.getValue();
        const isItemExist: boolean = cartModel.cartItems.map((value: CartItem, index: number, cartItems: CartItem[]) => {
            if (value.id === product.id ) {
                if (value.quantity - count >= 1) {
                    value.quantity = value.quantity - count;
                    changeInCartItemsTotal = changeInCartItemsTotal - (value.item.price * count);
                    return true;
                } else if (value.quantity - count === 0) {
                    this.removeCartItemFromCart(value);
                } else {
                    throw new RangeError("Invalid number of product requested to remove");
                }
            }
            return false;
        }).reduce(function(pre, cur) {return pre || cur; }, false);
        if (isItemExist) {
            cartModel.cartItemsTotal = cartModel.cartItemsTotal + changeInCartItemsTotal;
            this.upateBehaviourSubjectAndSyncing(cartModel);
            return;
        }
    }
    private retriveCartModelFromStorage(): CartModel {
        if (this.cartOptions.remoteSyncingEnabled) {
            // try to load all cartItems from server using getCartItems
            // and set it into local storage.
        }
        let cartModel: CartModel = <CartModel> JSON.parse(localStorage.getItem(this.CART_MODEL_LOCAL_STORAGE_KEY));
        return cartModel;
    }
    private saveCartModelIntoStorage(cartModel: CartModel) {
        if (this.cartOptions.localSyncingEnabled) {
            localStorage.setItem(this.CART_MODEL_LOCAL_STORAGE_KEY, JSON.stringify(cartModel));
        }
        if (this.cartOptions.remoteSyncingEnabled) {
            // try to save cartItem into server using addItemToCart
        }
    }

    public getCartModelSubject(): BehaviorSubject<CartModel> {
        return this.cartModelSubject;
    }

    public setShippingDetails(shippingDetails) {
        let cartModel: CartModel = this.cartModelSubject.getValue();
        shippingDetails.shippingCharge = this.cartOptions.calculateShippingCharge(shippingDetails);
        cartModel.shippingDetails = shippingDetails;
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }

    public setCouponDetails(couponDetails) {
        let cartModel: CartModel = this.cartModelSubject.getValue();
        cartModel.couponDetails = couponDetails;
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }
}