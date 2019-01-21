import { Product } from '../../product/entity/product.entity';

export type CreateCartItem = {
  productId: number;
  product: Product;
  title: string;
  price: number;
  quantity: number;
};
