import { Injectable, Post, Inject, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from '../entity/order.repository';
import { OrderItemRepository } from '../entity/order-item.repository';
import { ORDER_REPOSITORY, ORDER_ITEM_REPOSITORY } from '../constants';
import { User } from '../../user/entity/user.entity';
import { CartService } from '../../cart/services/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly OrderItemRepository: OrderItemRepository,
    private readonly cartService: CartService,
  ) {}

  async createOrder(user: User) {
    const cartItems = await this.cartService.getCartItems(user);

    if (cartItems.length === 0) {
      throw new UnauthorizedException();
    }

    let price = 0.0;
    cartItems.map((item) => {
        price = price + parseFloat((item.quantity * item.price).toFixed(2));
    });

    const order = await this.OrderRepository.save({
        user,
        createdAt: new Date(),
        price,
    });

    cartItems.map((item) => {
      price = price + (item.quantity * item.price);
      this.OrderItemRepository.save({
        orderId: order.id,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        amount: parseFloat((item.price * item.quantity).toFixed(2)),
        title: item.title,
        created_at: new Date(),
      });
    });

    await this.cartService.clearBasket(user);
  }
}
