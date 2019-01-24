import { Product } from '../../product/entity/product.entity';

export interface CreateCartItem {
  productId: number;
  product: Product;
  title: string;
  price: number;
  quantity: number;
}
