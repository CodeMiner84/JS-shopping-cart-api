import { Product } from '../../product/entity/product.entity';
export interface CartItemModel {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  productId?: Product;
}