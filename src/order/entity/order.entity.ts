import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { OrderItem } from './order-item.entity';
import { IsNumber, IsInt, IsDate, IsBoolean } from 'class-validator';

@Entity()
export class Order {
  @IsInt()
  @PrimaryGeneratedColumn() id: number;

  @IsInt()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @IsInt()
  @Column() userId: string;

  @OneToMany(type => OrderItem, item => item.order)
  orderItems: OrderItem[];

  @IsNumber()
  @Column() price!: number;

  @IsBoolean()
  @Column() completed!: boolean;

  @IsDate()
  @Column() createdAt!: Date;
}
