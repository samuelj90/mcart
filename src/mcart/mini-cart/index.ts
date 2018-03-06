import { error } from 'util';
import { MiniCartOptions} from "./mini-cart-options";
import { isNullOrUndefined } from "../utils";
import { Cart } from "../cart";
import { CartItem } from "../cart/cart-item";
import { Observable } from "rxjs/Observable";
import { defaultMiniCartOptions } from "./default-mini-cart-options";
import  *  as ejs from "ejs" ;
/**
 * - Should support multiple minicart on single configuartion
 * - Should have multiple cart items counter and multiple totals
 * - May or maynot have checkout and view cart buttons
 */
export class MiniCart extends Cart {
    private cartItems: CartItem[];

    constructor(private miniCartOptions: MiniCartOptions) {
        super();
        if (isNullOrUndefined(miniCartOptions)) {
            return;
        }
        if (miniCartOptions.renderToElements.length  <= 0) {
            return;
        }
        try {
            // TODO : Remove processing of  .
            miniCartOptions.renderToElements.forEach((renderToElement: JQuery, index: number, renderToElements: JQuery[]) => {
                if (renderToElement.length <= 0) {
                    throw new Error(`renderToElement ${renderToElement},  is not found in DOM`);
                }
            });
        } catch (error) {
            console.error(error);
        }

        miniCartOptions = $.extend({}, defaultMiniCartOptions, miniCartOptions);
        this.initializeMiniCart(miniCartOptions);
        const behaviourSubject = this.getCartItemsSubject();
        const self = this;
        behaviourSubject.subscribe(
            function (cartItems: CartItem[]) {
                self.renderMiniCartItems(miniCartOptions, cartItems);
                // TODO: Remove unused event bindings.
                self.initializeEventListerners(miniCartOptions);
            },
            function (error) {
                console.error("Error", error);
            },
            function () {
                console.debug("Completed behaviour subject subscription");
            }
        );
    }

    private initializeMiniCart(miniCartOptions: MiniCartOptions): void {
        if (miniCartOptions.replaceRenderToContents) {
            miniCartOptions.renderTo.html("");
        }
        let miniCartTemplateOptions = miniCartOptions.templateOptions;
        // let template = templateOptions.template(templateOptions, 0);
        let template = ejs.compile(miniCartTemplateOptions.template)(miniCartTemplateOptions) // ejs.render(miniCartTemplateOptions.template, miniCartTemplateOptions);
        miniCartOptions.renderTo.append(template);
    }

    private renderMiniCartItems(miniCartOptions: MiniCartOptions, cartItems: CartItem[]): any {
        let templateOptions = miniCartOptions.templateOptions;
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
        let cartItemsFooterTemplate = templateOptions.cartItemsFooterTemplate(templateOptions, subTotal);
        cartItemsContainer.append(cartItemsFooterTemplate);
        if (templateOptions.displayCarQtyInlinkBtnCounter) {
            miniCartOptions.renderTo.find("#" + templateOptions.linkBtnCounterElementId).html("" +  cartItemTotalQty);
        } else {
            miniCartOptions.renderTo.find("#" + templateOptions.linkBtnCounterElementId).html("" + cartItems.length);
        }
    }
    private initializeEventListerners(miniCartOptions: MiniCartOptions): void {
        let templateOptions = miniCartOptions.templateOptions;
        let cartItemsContainer = $("body").find("#" + templateOptions.cartItemsContainerId);
        $("body").on("click", ("#" + templateOptions.linkBtnId), function(){
            console.debug("#" + templateOptions.linkBtnId + " clicked");
            if (!miniCartOptions.overideOnLinkBtnClicked) {
                cartItemsContainer.slideToggle( "fast", function() {
                    console.debug("cartItemsContainer slide toggled");
                });
            }
            if (!isNullOrUndefined(miniCartOptions.onLinkBtnClicked)) {
                miniCartOptions.onLinkBtnClicked(miniCartOptions);
            }
        });
        $("body").find("#" + templateOptions.cartItemsContainerId).on("click", ("." + templateOptions.removeItemFromCartBtnElementClass), function(){
            console.debug("." + templateOptions.removeItemFromCartBtnElementClass + " clicked");
            let cartItem: CartItem = $(this).data("cartitem");
            if (!miniCartOptions.overideOnCartItemRemoveBtnClicked) {
                Cart.removeCartItemFromCart(cartItem);
            }
            if (!isNullOrUndefined(miniCartOptions.onCartItemRemoveBtnClicked)) {
                miniCartOptions.onCartItemRemoveBtnClicked(miniCartOptions, cartItem);
            }
        });
        $("body").find("#" + templateOptions.cartItemsContainerId).on("click", ("#" + templateOptions.viewCartBtnId), function(){
            if (!isNullOrUndefined(miniCartOptions.onViewCartBtnClicked)) {
                miniCartOptions.onViewCartBtnClicked(miniCartOptions);
            }
        });
        $("body").find("#" + templateOptions.cartItemsContainerId).on("click", ("#" + templateOptions.proceedToCheckoutBtnId), function(){
            if (!isNullOrUndefined(miniCartOptions.onProceedToCheckoutBtnClicked)) {
                miniCartOptions.onProceedToCheckoutBtnClicked(miniCartOptions);
            }
        });

    }

    // TODO create observer subscriber pattern for linkBtn CartItemsCount
}