import { Controller, Post, Body, Res, Get, UseGuards } from '@nestjs/common';
import { GetLoggedUser } from '../../auth/helpers/selectors';
import { OrderService } from '../service/order.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderSerice: OrderService,
  ) {}

  @Get('list')
  async orderList() {
    return ['order list'];
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@Res() res, @GetLoggedUser() user) {
    try {
      this.orderSerice.createOrder(user);
      res.json(200).end();
    } catch (e) {
      res.json(500).end();
    }
  }
}
