import { Controller, Get } from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @Get('')
  index() {
    return this.cartService.getCartItems();
  }
}
