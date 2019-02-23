import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  findUserOrders(id: string) {

    return this.createQueryBuilder('order')
    .leftJoinAndSelect('order.orderItems', 'orderItems')
    .where({userId: id})
    .getMany();
  }
}
