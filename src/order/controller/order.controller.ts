import { Controller, Post, Body, Res, Get, UseGuards } from '@nestjs/common';
import { GetLoggedUser } from '../../auth/helpers/selectors';
import { OrderService } from '../service/order.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderSerice: OrderService,
  ) {}

  @ApiResponse({ status: 200, description: 'Order list fetched successfully'})
  @ApiResponse({ status: 500, description: 'Something goes wrong'})
  @ApiBearerAuth()
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

  @ApiResponse({ status: 200, description: 'Order list fetched successfully'})
  @ApiResponse({ status: 500, description: 'Something goes wrong'})
  @ApiBearerAuth()
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
