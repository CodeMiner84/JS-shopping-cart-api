import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Product } from '../../product/entity/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @Column()
  userId!: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product!: Product;

  @Column()
  productId!: number;

  @Column() quantity!: number;

  @Column({length: 255}) title!: string;

  @Column() price!: number;

  @Column() created!: Date;
}
