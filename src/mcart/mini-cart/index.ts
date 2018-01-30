import { MiniCartOptions } from "./../mcart-options";
import { isNullOrUndefined } from "src/mcart/utils";
export class MiniCart {
    constructor(private miniCartOptions: MiniCartOptions) {
        if (isNullOrUndefined(miniCartOptions)) {
            throw new Error("miniCartOptions may not be empty!");
        }
        this.initializeMiniCart();
    }
    public initializeMiniCart() {

    }
}