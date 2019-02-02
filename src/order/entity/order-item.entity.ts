import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entity/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn() id: number;

  @Index()
  @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  order!: Order;

  @Column()
  orderId: number;

  @ManyToOne(() => Product, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  product!: Product;

  @Column()
  productId: number;

  @Column() price!: number;

  @Column() quantity!: number;

  @Column() amount!: number;

  @Column({ length: 255 }) title!: string;

  @Column() createdAt!: Date;
}
