import { Product } from "../product-listing/product";

export interface CartItem {
    title: string;
    item: Product;
    quantity: number;
}