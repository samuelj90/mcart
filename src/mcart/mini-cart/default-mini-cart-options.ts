import { MiniCartOptions } from "./mini-cart-options";
import { MiniCartTemplateOptions } from "./mini-cart-template-options";
import { CartItem } from "../cart/cart-item";

const miniCartOptions: MiniCartOptions = {
    "renderToElements": [jQuery("body")],
    "replaceRenderToElementsContent": [false],
    "triggerElements": [jQuery("#mcart-mincart-trigger")]
    "template":  [`
        <a class="p-2 text-dark" href="#" id="mcart-mincart-trigger">
            <i class="fa fa-shopping-cart"></i> Cart
            <span class="badge badge-secondary mcart-mincart-counter">0</span>
        </a>
        <div class="mini-cart">
            <div class="mini-cart-header">
                <i class="fa fa-shopping-cart cart-icon"></i>
                <span class="badge badge-secondary mcart-mincart-counter">0</span>
                <div class="mini-cart-total">
                    <span class="lighter-text">Total:</span>
                    <span class="main-color-text">0</span>
                </div>
            </div>
            <div class="shopping-cart-footer">
            <button type="button" class="btn btn-secondary">Checkout</button>
            </div>
        </div>
    `],
    "overideOnTriggerElementClicked": false,
    "overideOnViewCartElementClicked": false,
    "overideOnProceedToCheckoutElementClicked": false,
    "overideOnCartItemRemoveElementClicked": false
}

export const defaultMiniCartOptions = miniCartOptions;