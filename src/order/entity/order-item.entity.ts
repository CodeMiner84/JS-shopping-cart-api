import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entity/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Order, { onDelete: 'SET NULL' })
  order!: Order;

  @ManyToOne(() => Product, { onDelete: 'SET NULL' })
  product!: Product;

  @Column() price!: number;

  @Column() quantity!: number;

  @Column() amount!: number;

  @Column({ length: 255 }) title!: string;

  @Column() createdAt!: Date;
}
