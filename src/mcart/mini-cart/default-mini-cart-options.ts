import { MiniCartOptions } from "./mini-cart-options";
import { MiniCartTemplateOptions } from "./mini-cart-template-options";
import { CartItem } from "../cart/cart-item";

const miniCartOptions: MiniCartOptions = {
    "renderTo": $("body"),
    "replaceRenderToContents": false,
    "templateOptions": {
        "linkBtnCounterElementId": "mcart-mini-cart-cartitems-counter",
        "linkBtnId": "mcart-mini-cart-link",
        "viewCartBtnEnabled": true,
        "viewCartBtnId": "mcart-minicart-viewcart-btn",
        "viewCartBtnLabel": "VIEW CART",
        "proceedToCheckoutEnabled": true,
        "proceedToCheckoutBtnId": "mcart-minicart-proceedtocheckout-btn",
        "proceedToCheckoutBtnLabel": "PROCEED TO CHECKOUT",
        "prependCurrency": true,
        "quantityLabel": "Qty",
        "cartItemsContainerId": "mcart-minicart-cartitems-container",
        "template": function (miniCartTemplateOptions: MiniCartTemplateOptions, cartItemsCount: number) {
            return `
            <div class="mcart-minicart-wrpper">
                <a id="${miniCartTemplateOptions.linkBtnId}" href="#">
                <span id="${miniCartTemplateOptions.linkBtnCounterElementId}">${cartItemsCount}</span> Items in Cart
                </a>
                <div id="${miniCartTemplateOptions.cartItemsContainerId}">
                    No Items in cart
                </div>
            </div>
            `;
        },
        "cartItemTemplate": function (miniCartTemplateOptions: MiniCartTemplateOptions, cartItem: CartItem, index: number, cartItems: CartItem[]) {
            return `
                    <div class="mcart-minicart-cart-item clearfix">
                        <div class="mcart-minicart-image col-md-3"> <img src="${cartItem.item.featuredImage}" alt="" /> </div>
                        <div class="mcart-minicart-content mcart-minicart-content1 col-md-9">
                            <h4 class="mcart-minicart-title"><a href="#">${cartItem.title}</a></h4>
                            <span class="mcart-minicart-price">${cartItem.item.price}</span>
                            <span class="mcart-minicart-quantity">${miniCartTemplateOptions.quantityLabel} : ${cartItem.quantity}</span>
                            <span class="mcart-minicart-remove mcart-minicart-remove">X</span>
                        </div>
                    </div>
                `;
        }
    },
}

export const defaultMiniCartOptions = miniCartOptions;