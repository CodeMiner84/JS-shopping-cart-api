import { Controller, Get, Post, Body, Res, CacheKey, Inject, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CART_REPOSITORY } from '../constants';
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { CartItem } from '../entity/cart.entity';
import { GetLoggedUser } from '../../auth/helpers/selectors';

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
    const exists = await this.cartService.itemExists(params.productId, user);

    try {
      if (exists) {
        await this.cartRepository.update(
          {id: exists.id},
          {quantity: exists.quantity + params.quantity},
        );

        res.status(200).json(['done']);
      } else {
        const model = this.cartRepository.save({
          ...params,
          user,
          product: params.productId,
        });

        res.status(200).json(model);
      }
    } catch (e) {
      res.status(500).json({message: e.message});
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param() params, @GetLoggedUser() user, @Res() res) {
    try {
      await this.cartService.removeById(params.id, user.id);

      res.status(200).json({message: 'removed'});
    } catch (e) {
      res.status(500).error({message: e.message});
    }
  }
}
