import { MiniCartOption } from "./mini-cart-options";
import { CartItem } from "../cart/cart-item";
import { Cart } from "../cart";
import { minicartTemplate } from "./mini-cart-template";

const miniCartOption: MiniCartOption = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: minicartTemplate,
    triggerElement: "#mcart-mincart-trigger",
    onTriggerElementClicked: (miniCartOption: MiniCartOption, $this: JQuery) => {
        miniCartOption.renderToElement.find(".mini-cart").slideToggle( "fast");
    },
    viewCartElement: ".viewCart",
    onViewCartElementClicked: (miniCartOption: MiniCartOption, $this: JQuery) => {
        window.location.href = "/cart";
    },
    proceedToChekcoutElement: ".checkout",
    onProceedToCheckoutElementClicked: (miniCartOption: MiniCartOption, $this: JQuery) => {
        window.location.href = "/cart";
    },
    cartItemRemoveElement: ".item-remove",
    onCartItemRemoveElementClicked: (miniCartOption: MiniCartOption, cartItem: CartItem, $this: JQuery) => {
        Cart.removeCartItemFromCart(cartItem);
    }
};

export const defaultMiniCartOption = miniCartOption;