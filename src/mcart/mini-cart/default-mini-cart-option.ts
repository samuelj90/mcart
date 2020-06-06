import { MiniCartOption } from "./mini-cart-options";
import { CartItem } from "../cart/cart-item";
import { Cart } from "../cart";
import { minicartTemplate } from "./mini-cart-template";

const miniCartOption: MiniCartOption = {
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: minicartTemplate,
    triggerElement: ".mcart-minicart-trigger",
    endpoints: {
        cartPageUrl: "/cart.html",
        checkoutPageUrl: "/cart.html"
    },
    wrapperElement: ".mcart-minicart-wrapper",
    onTriggerElementClicked: (miniCartOption: MiniCartOption, $this: JQuery) => {
        miniCartOption.renderToElement.find(miniCartOption.wrapperElement).slideToggle( "fast");
    },
    viewCartElement: ".mcart-minicart-view-cart",
    onViewCartElementClicked: (miniCartOption: MiniCartOption, $this: JQuery) => {
        window.location.href = miniCartOption.endpoints.cartPageUrl;
    },
    proceedToChekcoutElement: ".mcart-minicart-checkout",
    onProceedToCheckoutElementClicked: (miniCartOption: MiniCartOption, $this: JQuery) => {
        window.location.href = miniCartOption.endpoints.checkoutPageUrl;
    },
    cartItemRemoveElement: ".mcart-minicart-item-remove",
    onCartItemRemoveElementClicked: (miniCartOption: MiniCartOption, cartItem: CartItem, $this: JQuery) => {
        Cart.getInstance().removeCartItemFromCart(cartItem);
    }
};

export const defaultMiniCartOption = miniCartOption;