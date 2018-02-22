import { MiniCartOptions } from "./mini-cart-options";
import { MiniCartTemplateOptions } from "./mini-cart-template-options";
import { CartItem } from "../cart/cart-item";

const miniCartOptions: MiniCartOptions = {
    "renderTo": jQuery("body"),
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
        "removeItemFromCartBtnElementClass": "mcart-minicart-removeitem-from-cart",
        "cartItemsFooterId": "mcart-minicart-cartitems-footer",
        "cartItemsSubTotalContainerId": "mcart-minicart-cartitems-subtotal",
        "cartItemsSubTotalLabel": "Sub Total  : ",
        "displayCarQtyInlinkBtnCounter": true,
        "template": function (miniCartTemplateOptions: MiniCartTemplateOptions, cartItemsCount: number) {
            return `
            <div class="mcart-minicart">
                <a id="${miniCartTemplateOptions.linkBtnId}" href="#">
                <span id="${miniCartTemplateOptions.linkBtnCounterElementId}">${cartItemsCount}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/>
                </svg>
                </a>
                <div id="${miniCartTemplateOptions.cartItemsContainerId}">
                    No Items in cart
                </div>
            </div>
            `;
        },
        "cartItemsFooterTemplate": function (miniCartTemplateOptions: MiniCartTemplateOptions, subTotal: number = 0) {
            return `
            <div id="${miniCartTemplateOptions.cartItemsFooterId}">
            <div id="${miniCartTemplateOptions.cartItemsSubTotalContainerId}"><span class="label">${miniCartTemplateOptions.cartItemsSubTotalLabel}</span><span class="value">${subTotal}</span></div>
                <button id="${miniCartTemplateOptions.viewCartBtnId}">${miniCartTemplateOptions.viewCartBtnLabel}</button>
                <button id="${miniCartTemplateOptions.proceedToCheckoutBtnId}">${miniCartTemplateOptions.proceedToCheckoutBtnLabel}</button>
            </div>
            `;
        },
        "cartItemTemplate": function (miniCartTemplateOptions: MiniCartTemplateOptions, cartItem: CartItem, index: number, cartItems: CartItem[]) {
            return `
                    <div class="mcart-minicart-cart-item">
                        <div class="mcart-minicart-image"> <img src="${cartItem.item.featuredimage}" alt="" /> </div>
                        <div class="mcart-minicart-content">
                            <h4 class="mcart-minicart-title">
                            <a href="#">${cartItem.title}</a>
                            </h4>
                            <span class="mcart-minicart-price">${cartItem.item.currency} ${cartItem.item.price}</span>
                            <span class="mcart-minicart-quantity">${miniCartTemplateOptions.quantityLabel} : ${cartItem.quantity}</span>
                            <span class="${miniCartTemplateOptions.removeItemFromCartBtnElementClass}">X</span>
                        </div>
                    </div>
                `;
        },
    },
    "overideOnLinkBtnClicked": false,
    "overideOnViewCartBtnClicked": false,
    "overideOnProceedToCheckoutBtnClicked": false,
    "overideOnCartItemRemoveBtnClicked": false
}

export const defaultMiniCartOptions = miniCartOptions;