import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { CartItem } from './cart.entity';
import { User } from '../../user/entity/user.entity';

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

  clearCartItems(user: User): Promise<DeleteResult> {
    return this.createQueryBuilder('cart')
      .delete()
      .where({user})
      .execute();
  }
}
