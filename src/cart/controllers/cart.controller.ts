import { Controller, Get, Post, Body, Res, CacheKey, Inject, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedUser } from '../../auth/helpers/selectors';
import { RecalculateProps } from '../dto/recalulate-cart.dto';
import { CreateCartItem } from '../dto/create-cartitem.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @Get('')
  index() {
    return this.cartService.getCartItems();
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async addToCart(@Body() params: CreateCartItem, @GetLoggedUser() user, @Res() res): Promise<any> {
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
      await this.cartService.recalculate(params, user);

      res.status(200).end();
    } catch (e) {
      res.status(500).end();
    }
  }
}
