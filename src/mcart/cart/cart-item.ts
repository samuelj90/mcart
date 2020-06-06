import { Product } from "../product-listing/product";

export interface CartItem {
    id: number;
    item: Product;
    quantity: number;
}