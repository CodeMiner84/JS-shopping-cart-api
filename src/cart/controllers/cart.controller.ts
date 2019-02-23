import { Controller, Get, Post, Body, UseGuards, Delete, Param, Patch, UseFilters } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedUser } from '../../auth/helpers/selectors';
import { RecalculateProps } from '../dto/recalulate-cart.dto';
import { CreateCartItem } from '../dto/create-cartitem.dto';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartItem } from '../entity/cart.entity';
import { HttpExceptionFilter } from '../../common/exceptions/exception-filter';

@UseFilters(new HttpExceptionFilter())
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @ApiResponse({ status: 200, description: 'Cart items fetched'})
  @ApiResponse({ status: 500, description: 'Something goes wrong'})
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  index(@GetLoggedUser() user): Promise<CartItem[]> {
    return this.cartService.getCartItems(user);
  }

  @ApiResponse({ status: 200, description: 'Added to cart'})
  @ApiResponse({ status: 500, description: 'Something goes wrong'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToCart(@Body() params: CreateCartItem, @GetLoggedUser() user): Promise<void> {
    this.cartService.addToCart(params, user);
  }

  @ApiResponse({ status: 200, description: 'Item removed from cart'})
  @ApiResponse({ status: 500, description: 'Something goes wrong'})
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param() params, @GetLoggedUser() user): Promise<void> {
    await this.cartService.removeById(params.id, user.id);
  }

  @ApiResponse({ status: 200, description: 'Cart recalculated'})
  @ApiResponse({ status: 500, description: 'Something goes wrong'})
  @ApiBearerAuth()
  @Patch('/recalculate')
  @UseGuards(AuthGuard('jwt'))
  async recalculate(@Body() params: RecalculateProps, @GetLoggedUser() user): Promise<void> {
    await this.cartService.recalculate(params, user);
  }
}
