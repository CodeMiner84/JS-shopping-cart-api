import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { CartItem } from './cart.entity';

@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {
  findByCustomer() {
    return this.createQueryBuilder('cart').getMany();
  }

  removeCartItem(cartItem: CartItem): Promise<DeleteResult> {
    return this.createQueryBuilder('cart')
      .delete()
      .where({cartItem})
      .execute();
  }
}
