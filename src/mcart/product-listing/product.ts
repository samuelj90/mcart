/**
 *
 * export interface Product {
 *  id: number;
 *  sku: string;
 *  identifier: string;
 *  name: string;
 *  currency: string;
 *  type: string;
 *  price: string;
 *  rebate_price: string;
 *  is_active: boolean;
 *  is_buyable: boolean;
 *  is_shippable: boolean;
 *  is_featured_new: boolean;
 *  weight: number;
 *  length: number;
 *  width: number;
 *  height: number;
 *  in_promotion: boolean;
 *  parent_product_id: number;
 *  is_managed_inventory: boolean;
 *  number_remaining: number;
 *  number_sold: number;
 * }
 */
export interface IProduct {
    id: number;
    sku: string;
    identifier: string;
    title: string;
    description: string;
    price: number;
    featuredimage: string;
    images: string[];
    currency: string;
    additionalFields?: any;
}
