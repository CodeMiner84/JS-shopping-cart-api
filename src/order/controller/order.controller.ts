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
  @UseGuards(AuthGuard('jwt'))
  async orderList(@Res() res, @GetLoggedUser() user) {
    try {
      const orderList = await this.orderSerice.getUserOrders(user.id);
      res.status(200).json(orderList);
    } catch (e) {
      res.status(500).end();
    }
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@Res() res, @GetLoggedUser() user) {
    try {
      this.orderSerice.createOrder(user);
      res.status(200).end();
    } catch (e) {
      res.status(500).end();
    }
  }
}
