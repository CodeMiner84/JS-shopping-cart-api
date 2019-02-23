import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderOutputModel } from '../dtos/order.output.model';

@EntityRepository(Order)
export class OrderRepository extends Repository<OrderOutputModel> {
  findUserOrders(id: string) {
    return this.createQueryBuilder('order')
    .leftJoinAndSelect('order.orderItems', 'orderItems')
    .where({userId: id})
    .getMany();
  }
}
