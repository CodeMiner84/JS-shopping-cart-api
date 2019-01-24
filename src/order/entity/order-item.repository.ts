import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { OrderItem } from './order-item.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> {
}
