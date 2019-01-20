import { Injectable, Inject } from '@nestjs/common';
import { CART_REPOSITORY } from '../constants';
import { CartItemModel } from '../interfaces/cart.dto';
import { CartItem } from '../entity/cart.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CartItemRepository } from '../entity/cart.repository';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartItemRepository,
  ) {}

  async getCartItems(): Promise<CartItem[]> {
    return await this.cartRepository.find();
  }

  async itemExists(productId: number, userId?: number): Promise<CartItem> {
    return await this.cartRepository.findOne({
      productId,
      userId,
    });
  }

  async findUserProduct(product: Product, user: User): Promise<CartItem> {
    return await this.cartRepository.findOne({
      product,
      user,
    });
  }

  async removeById(product: Product, user: User): Promise<DeleteResult> {
    const cartItem = await this.findUserProduct(product, user);
    return await this.cartRepository.removeCartItem(cartItem);
  }
}
