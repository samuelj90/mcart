import { BehaviorSubject } from "rxjs";
import { IProduct } from "../product-listing/product";
import { isNullOrUndefined } from "../utils";
import { ICartItem } from "./cart-item";
import { ICartModel } from "./cart-model";
import { ICartOptions } from "./cart-options";
import { defaultCartOptions } from "./default-cart-options";
export class Cart {
    public static getInstance(cartOptions?: ICartOptions): Cart {
        return this.instance || (this.instance = new this(cartOptions));
    }

    private static readonly CART_MODEL_LOCAL_STORAGE_KEY = "mcart-cart-model";

    private static instance: Cart;
    // private cartModel: CartModel;
    private cartModelSubject: BehaviorSubject<ICartModel>;
    private cartOptions: ICartOptions;

    private constructor(cartOptions?: ICartOptions) {
        if (!isNullOrUndefined(this.cartModelSubject)) {
            return;
        }
        this.cartOptions = $.extend({}, defaultCartOptions, cartOptions);
        this.initializeCart();
    }

    public getCartModelSubject(): BehaviorSubject<ICartModel> {
        return this.cartModelSubject;
    }

    public setShippingDetails(shippingDetails) {
        const cartModel: ICartModel = this.cartModelSubject.getValue();
        shippingDetails.shippingCharge = this.cartOptions.calculateShippingCharge(shippingDetails);
        cartModel.shippingDetails = shippingDetails;
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }

    public setCouponDetails(couponDetails) {
        const cartModel: ICartModel = this.cartModelSubject.getValue();
        cartModel.couponDetails = couponDetails;
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }

    public upateBehaviourSubjectAndSyncing(cartModel: ICartModel) {
        cartModel.taxAmount = this.cartOptions.calculateTaxAmount(cartModel);
        this.cartModelSubject.next(cartModel);
        if (this.cartOptions.localSyncingEnabled) {
            this.saveCartModelIntoStorage(cartModel);
        }
    }

    public upateBehaviourSubjectWithoutSyncing(cartModel: ICartModel) {
        cartModel.taxAmount = this.cartOptions.calculateTaxAmount(cartModel);
        this.cartModelSubject.next(cartModel);
    }

    public insertProductToCart(product: IProduct, count: number = 1) {
        const cartModel: ICartModel = this.cartModelSubject.getValue();
        let changeInCartItemsTotal = 0;
        if (isNullOrUndefined(cartModel.cartItems)) {
            this.initializeCart();
        } else {
            const isItemExist: boolean = cartModel.cartItems.map(
                (value: ICartItem, index: number, cartItems: ICartItem[]) => {
                    if (value.id === product.id) {
                        value.quantity = value.quantity + count;
                        changeInCartItemsTotal = changeInCartItemsTotal + (value.item.price * count);
                        return true;
                    }
                    return false;
                }).reduce((pre, cur) => pre || cur, false);
            if (isItemExist) {
                cartModel.cartItemsTotal = cartModel.cartItemsTotal + changeInCartItemsTotal;
                this.upateBehaviourSubjectAndSyncing(cartModel);
                return;
            }
        }
        const cartItem: ICartItem = {
            id: product.id,
            item: product,
            quantity: count,
        };
        cartModel.cartItems.push(cartItem);
        changeInCartItemsTotal = (changeInCartItemsTotal + cartItem.item.price * count);
        cartModel.cartItemsTotal = cartModel.cartItemsTotal + changeInCartItemsTotal;
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }

    public removeCartItemFromCart(cartItem: ICartItem) {
        const cartModel: ICartModel = this.cartModelSubject.getValue();
        const cartItemsToRemove: ICartItem[] = cartModel.cartItems.filter((value) => value.id === cartItem.id);
        cartModel.cartItems = cartModel.cartItems.filter((value) => value.id !== cartItem.id);
        let changeInCartItemsTotal = 0;
        cartItemsToRemove.forEach((item: ICartItem) => {
            changeInCartItemsTotal = changeInCartItemsTotal - (item.quantity * item.item.price);
        });
        cartModel.cartItemsTotal = cartModel.cartItemsTotal + changeInCartItemsTotal;
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }
    public removeProductFromCart(product: IProduct, count: number = 1) {
        let changeInCartItemsTotal = 0;
        const cartModel: ICartModel = this.cartModelSubject.getValue();
        const isItemExist: boolean = cartModel.cartItems.map(
            (value: ICartItem, index: number, cartItems: ICartItem[]) => {
                if (value.id === product.id) {
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
            }).reduce((pre, cur) => pre || cur, false);
        if (isItemExist) {
            cartModel.cartItemsTotal = cartModel.cartItemsTotal + changeInCartItemsTotal;
            this.upateBehaviourSubjectAndSyncing(cartModel);
            return;
        }
    }
    private retriveCartModelFromStorage(): ICartModel {
        if (this.cartOptions.remoteSyncingEnabled) {
            // try to load all cartItems from server using getCartItems
            // and set it into local storage.
        }
        const cartModel: ICartModel = JSON.parse(localStorage.getItem(Cart.CART_MODEL_LOCAL_STORAGE_KEY)) as ICartModel;
        return cartModel;
    }
    private saveCartModelIntoStorage(cartModel: ICartModel) {
        if (this.cartOptions.localSyncingEnabled) {
            localStorage.setItem(Cart.CART_MODEL_LOCAL_STORAGE_KEY, JSON.stringify(cartModel));
        }
        if (this.cartOptions.remoteSyncingEnabled) {
            // try to save cartItem into server using addItemToCart
        }
    }

    private initializeCart() {
        // TODO retrive items from local storage if localSyncingEnabled is enabled
        let cartModel: ICartModel = {
            cartItems: [],
            cartItemsTotal: 0,
            couponDetails: {},
            shippingDetails: {
                shippingCharge: 0,
            },
            taxAmount: 0,
        };
        if (this.cartOptions.localSyncingEnabled) {
            const cartModelFromStorage = this.retriveCartModelFromStorage();
            if (!isNullOrUndefined(cartModelFromStorage)) {
                cartModel = cartModelFromStorage;
                this.cartModelSubject = new BehaviorSubject(cartModel);
                return;
            }
        }
        this.cartModelSubject = new BehaviorSubject(cartModel);
        this.upateBehaviourSubjectAndSyncing(cartModel);
    }
}
