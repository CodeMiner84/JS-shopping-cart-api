import { Controller, Get, Post, Body, Res, CacheKey, Inject, UseGuards, Req } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { GetLoggedUser } from '../../auth/helpers/selectors';
import { CART_REPOSITORY } from '../constants';
import { CartItemModel } from '../interfaces/cart.dto';
import { Model } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { CartItem } from '../entity/cart.entity';

@Controller('cart')
export class CartController {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: Repository<CartItem>,
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
      await this.cartRepository.update(
        {productId: exists.productId, customerId: user._id},
        {quantity: exists.quantity + params.quantity},
      );

      res.status(200).json(['done']);
    } else {
      const model = this.cartRepository.save({
        ...params,
        customer_id: user._id,
      });

      res.status(200).json(model);
    }

  }
}
