import { Controller, Get, Post, Body, Res, CacheKey, Inject, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CART_REPOSITORY } from '../constants';
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { CartItem } from '../entity/cart.entity';
import { GetLoggedUser } from '../../auth/helpers/selectors';

type RecalculateProps = {
  id: number;
  quantity: number;
};

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
    try {
      this.cartService.addToCart(params, user);

      return res.status(200).end();
    } catch (e) {
      return res.status(500).end();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param() params, @GetLoggedUser() user, @Res() res) {
    try {
      await this.cartService.removeById(params.id, user.id);

      res.status(200).end();
    } catch (e) {
      res.status(500).end();
    }
  }

  @Patch('/recalculate')
  @UseGuards(AuthGuard('jwt'))
  async recalculate(@Body() params: RecalculateProps, @GetLoggedUser() user, @Res() res) {
    try {
      await this.cartService.recalculate(params.id, params.quantity, user);

      res.status(200).end();
    } catch (e) {
      res.status(500).end();
    }
  }
}
