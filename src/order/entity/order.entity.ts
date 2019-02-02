import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  userId: string;

  @OneToMany(type => OrderItem, item => item.order)
  orderItems: OrderItem[];

  @Column() price!: number;

  @Column() completed!: boolean;

  @Column() createdAt!: Date;
}
