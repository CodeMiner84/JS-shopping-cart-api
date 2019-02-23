import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { GetLoggedUser } from '../../auth/helpers/selectors';
import { OrderService } from '../service/order.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrderOutputModel } from '../dtos/order.output.model';

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
  async orderList(@GetLoggedUser() user): Promise<OrderOutputModel[]> {
    return await this.orderSerice.getUserOrders(user.id);
  }

  @ApiResponse({ status: 200, description: 'Order list fetched successfully'})
  @ApiResponse({ status: 500, description: 'Something goes wrong'})
  @ApiBearerAuth()
  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@GetLoggedUser() user): Promise<void> {
    this.orderSerice.createOrder(user);
  }
}
