import { Injectable, Inject } from '@nestjs/common';
import { CART_REPOSITORY } from '../constants';
import { CartItemModel } from '../interfaces/cart.dto';
import { CartItem } from '../entity/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: Repository<CartItem>,
  ) {}

  async getCartItems(): Promise<CartItem[]> {
    return await this.cartRepository.find();
  }

  async itemExists(productId: number, customerId?: number): Promise<CartItem> {
    return await this.cartRepository.findOne({
      productId,
      customerId,
    });
  }
}
