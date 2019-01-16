import { Controller, Get, Post, Body, Res, CacheKey, Inject, UseGuards, Req } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { GetLoggedUser } from '../../auth/helpers/selectors';
import { CART_ENTITY } from '../constants';
import { CartItemModel } from '../interfaces/cart.dto';
import { Model } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(
    @Inject(CART_ENTITY)
    private readonly cartEntity: Model<CartItemModel>,
    private readonly cartService: CartService,
  ) {}

  @Get('')
  index() {
    return this.cartService.getCartItems();
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async addToCart(@Body() params, @GetLoggedUser() user, @Res() res): Promise<any> {
    const exists = await this.cartService.itemExists(params.product_id, user._id);

    if (exists) {
      await this.cartEntity.update(
        {product_id: exists.product_id, customer_id: user._id},
        {quantity: exists.quantity + params.quantity},
      );

      res.status(200).json(['done']);
    } else {
      const model = this.cartEntity({
        ...params,
        customer_id: user._id,
      }).save();

      res.status(200).json(params);
    }

  }
}
