import { Injectable, Inject, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { CART_ENTITY } from '../constants';
import { CartItemModel } from '../interfaces/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_ENTITY)
    private readonly productModel: Model<any>,
  ) {}

  async getCartItems(): Promise<CartItemModel> {
    return await this.productModel.find().exec();
  }
}
