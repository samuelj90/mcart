import { Cart } from "../cart";
import { CartPageOptions } from "./cart-page-options";
import { isNullOrUndefined } from "../utils";
import { defaultCartPageOptions } from "./default-cart-page-options";
import { CartItem } from "../cart/cart-item";
import { Product } from "../product-listing/product";

export class CartPage extends Cart {

    constructor(cartPageOptions: CartPageOptions) {
        super();
        if (isNullOrUndefined(cartPageOptions)) {
            return;
        }
        if (cartPageOptions.renderTo.length <= 0) {
            return;
        }
        cartPageOptions = $.extend({}, defaultCartPageOptions, cartPageOptions);
        this.initializeCartPage(cartPageOptions);
        const behaviourSubject = this.getCartItemsSubject();
        const self = this;
        behaviourSubject.subscribe(
            function (cartItems: CartItem[]) {
                console.debug("cartItems >> ", cartItems)
                self.renderCartPage(cartPageOptions, cartItems);
            },
            function (error) {
                console.log("Error", error);
            },
            function () {
                console.debug("Completed");
            }
        );
        this.initializeEventListerners(cartPageOptions);
        console.log(behaviourSubject.observers);
    }
    initializeCartPage(cartPageOptions: CartPageOptions): void {
        if (cartPageOptions.replaceRenderToContents) {
            cartPageOptions.renderTo.html("");
        }
        let templateOptions = cartPageOptions.templateOptions;
        let template = templateOptions.template(templateOptions);
        cartPageOptions.renderTo.append(template);
    }
    renderCartPage(cartPageOptions: CartPageOptions, cartItems: CartItem[]): void {
        // iterate over cart items and display items
        let templateOptions = cartPageOptions.templateOptions;
        let cartItemsContainer  = $("#" + templateOptions.cartItemsContainerId);
        let subTotal = 0, cartItemTotalQty = 0;
        if(cartItems.length == 0) {
            cartItemsContainer.html('<tr><td colspan="5"><br/><br/><center>No items in Cart</center><br/><br/></td></tr>');
        } else {            
            cartItemsContainer.html("");
            cartItems.forEach((cartItem: CartItem, index: number, cartItems: CartItem[]) => {
                subTotal = subTotal + (cartItem.quantity * cartItem.item.price);
                cartItemTotalQty = cartItemTotalQty + cartItem.quantity;
                let template = templateOptions.cartItemTemplate(templateOptions, cartItem, index, cartItems);
                cartItemsContainer.append(template)
                cartItemsContainer.find("." + templateOptions.removeItemFromCartBtnElementClass + ":last").data("cartitem", cartItem)
                cartItemsContainer.find("." + templateOptions.cartItemIncrementerElementClass + ":last").data("cartitem", cartItem)
                cartItemsContainer.find("." + templateOptions.cartItemDecrementerElementClass + ":last").data("cartitem", cartItem)
            });
        }
        let footerData = {
            subTotal: subTotal
        }
        let cartItemsFooterTemplate = templateOptions.cartItemsFooterTemplate(templateOptions, cartItems, footerData);
        $("#" + templateOptions.cartItemsFooterContainerId).html(cartItemsFooterTemplate);
    }
    initializeEventListerners(cartPageOptions: CartPageOptions): void {
        let templateOptions = cartPageOptions.templateOptions;
        let cartItemsContainer = cartPageOptions.renderTo.find("#" + templateOptions.cartItemsContainerId);
        cartPageOptions.renderTo.on("click", ("." + templateOptions.removeItemFromCartBtnElementClass), function(){
            console.debug("." + templateOptions.removeItemFromCartBtnElementClass + " clicked");
            let cartItem: CartItem = $(this).data("cartitem");
            if (!cartPageOptions.overideOnCartItemRemoveBtnClicked) {
                Cart.removeCartItemFromCart(cartItem);
            }
            if (!isNullOrUndefined(cartPageOptions.onCartItemRemoveBtnClicked)) {
                cartPageOptions.onCartItemRemoveBtnClicked(cartPageOptions, cartItem);
            }
        });
        cartPageOptions.renderTo.on("click", ("." + templateOptions.cartItemIncrementerElementClass), function(){  
            let cartItem: CartItem = $(this).data("cartitem");
            let product: Product = cartItem.item;
            Cart.insertProductToCart(product, 1);
        });
        cartPageOptions.renderTo.on("click", ("." + templateOptions.cartItemDecrementerElementClass), function(){
            let cartItem: CartItem = $(this).data("cartitem");
            let product: Product = cartItem.item;
            Cart.removeProductFromCart(product, 1);
        });
    }
}