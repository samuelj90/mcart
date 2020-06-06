import { Cart } from "../cart";
import { ICartItem } from "../cart/cart-item";
import { IMiniCartOption } from "./mini-cart-options";
import { minicartTemplate } from "./mini-cart-template";

const miniCartOption: IMiniCartOption = {
    cartItemRemoveElement: ".mcart-minicart-item-remove",
    endpoints: {
        cartPageUrl: "/cart.html",
        checkoutPageUrl: "/cart.html",
    },
    onCartItemRemoveElementClicked: (option: IMiniCartOption, cartItem: ICartItem, $this: JQuery) => {
        Cart.getInstance().removeCartItemFromCart(cartItem);
    },
    onProceedToCheckoutElementClicked: (option: IMiniCartOption, $this: JQuery) => {
        window.location.href = option.endpoints.checkoutPageUrl;
    },
    onTriggerElementClicked: (option: IMiniCartOption, $this: JQuery) => {
        miniCartOption.renderToElement.find(option.wrapperElement).slideToggle("fast");
    },
    onViewCartElementClicked: (option: IMiniCartOption, $this: JQuery) => {
        window.location.href = option.endpoints.cartPageUrl;
    },
    proceedToChekcoutElement: ".mcart-minicart-checkout",
    renderToElement: jQuery("body"),
    replaceRenderToElementContent: false,
    template: minicartTemplate,
    triggerElement: ".mcart-minicart-trigger",
    viewCartElement: ".mcart-minicart-view-cart",
    wrapperElement: ".mcart-minicart-wrapper",
};

export const defaultMiniCartOption = miniCartOption;
