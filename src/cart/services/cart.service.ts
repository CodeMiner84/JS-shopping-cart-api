import { Injectable, Inject } from '@nestjs/common';
import { CART_REPOSITORY } from '../constants';
import { CartItem } from '../entity/cart.entity';
import { DeleteResult } from 'typeorm';
import { CartItemRepository } from '../entity/cart.repository';
import { Product } from '../../product/entity/product.entity';
import { User } from '../../user/entity/user.entity';
import { CreateCartItem } from '../dto/create-cartitem.dto';
import { RecalculateProps } from '../dto/recalulate-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartItemRepository,
  ) {}

  async getCartItems(user: User): Promise<CartItem[]> {
    return await this.cartRepository.find({userId: user.id});
  }

  async itemExists(product: Product, user?: User): Promise<CartItem> {
    return await this.cartRepository.findOne({
      product,
      user,
    });
  }

  async findUserProduct(cartId: number, userId: number): Promise<CartItem> {
    return await this.cartRepository.findOne({
      id: cartId,
      userId,
    });
  }

  async removeById(product: number, user: number): Promise<DeleteResult> {
    const cartItem = await this.findUserProduct(product, user);

    if (cartItem !== undefined) {
      return await this.cartRepository.removeCartItem(cartItem);
    }
  }

  async addToCart(params: CreateCartItem, user: User): Promise<boolean> {
    const exists = await this.itemExists(params.product, user);
    if (exists) {
      await this.cartRepository.update(
        {id: exists.id},
        {quantity: exists.quantity + params.quantity},
      );

      return true;
    }

    this.cartRepository.save({
      ...params,
      user,
      product: params.product,
    });

    return true;
  }

  async recalculate(params: RecalculateProps, user: User): Promise<void> {
    await this.cartRepository.update(
      {id: params.id, user},
      {quantity: params.quantity},
    );
  }

  async clearBasket(user: User): Promise<DeleteResult> {
    return await this.cartRepository.clearCartItems(user);
  }
}
