import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entity/product.entity';
import { IsString, IsInt, IsDate, IsNumber } from 'class-validator';

@Entity()
export class OrderItem {
  @IsInt()
  @PrimaryGeneratedColumn() id: number;

  @IsInt()
  @Index()
  @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
  order!: Order;

  @IsInt()
  @Column()
  orderId: number;

  @IsInt()
  @ManyToOne(() => Product, { onDelete: 'SET NULL', nullable: true })
  product!: Product;

  @IsNumber()
  @Column() price!: number;

  @IsInt()
  @Column() quantity!: number;

  @IsNumber()
  @Column() amount!: number;

  @IsString()
  @Column({ length: 255 }) title!: string;

  @IsDate()
  @Column() createdAt!: Date;
}
