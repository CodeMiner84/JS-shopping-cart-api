import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Product } from '../../product/entity/product.entity';
import { IsString, IsInt, IsDate, IsNumber } from 'class-validator';

@Entity()
export class CartItem {
  @IsInt()
  @PrimaryGeneratedColumn() id!: number;

  @IsInt()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @IsInt()
  @Column() userId!: number;

  @IsInt()
  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product!: Product;

  @IsInt()
  @Column() productId!: number;

  @IsInt()
  @Column() quantity!: number;

  @IsString()
  @Column({length: 255}) title!: string;

  @IsNumber()
  @Column() price!: number;

  @IsDate()
  @Column() created!: Date;
}
