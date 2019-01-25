import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { DatabaseModule } from '../database/database.module';
import { orderProviders } from './providers/order.provider';
import { orderItemProviders } from './providers/order-item.providers';
import { CartService } from '../cart/services/cart.service';
import { cartProviders } from 'src/cart/providers/cart.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, CartService, ...cartProviders, ...orderProviders, ...orderItemProviders],
})
export class OrderModule {}
