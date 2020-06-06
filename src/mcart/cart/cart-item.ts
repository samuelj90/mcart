import { IProduct } from "../product-listing/product";

export interface ICartItem {
    id: number;
    item: IProduct;
    quantity: number;
}
