import { Cart } from "../cart";
import { CartPageOptions } from "./cart-page-options";
import { isNullOrUndefined } from "../utils";
import { defaultCartPageOptions } from "./default-cart-page-options";
import { CartItem } from "../cart/cart-item";

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
        cartItemsContainer.html("");
        let subTotal = 0, cartItemTotalQty = 0;
        cartItems.forEach((cartItem: CartItem, index: number, cartItems: CartItem[]) => {
            subTotal = subTotal + (cartItem.quantity * cartItem.item.price);
            cartItemTotalQty = cartItemTotalQty + cartItem.quantity;
            let template = templateOptions.cartItemTemplate(templateOptions, cartItem, index, cartItems);
            cartItemsContainer.append(template)
            cartItemsContainer.find("." + templateOptions.removeItemFromCartBtnElementClass + ":last").data("cartitem", cartItem)
        });
        // render the cartitems footer
        let footerData = {
            subTotal: subTotal
        }
        let cartItemsFooterTemplate = templateOptions.cartItemsFooterTemplate(templateOptions, cartItems, footerData);
        cartItemsContainer.append(cartItemsFooterTemplate);
    }
    initializeEventListerners(cartPageOptions: CartPageOptions): void {

    }
}