import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  productId: number;

  @Column('text')
  quantity: string;

  @Column()
  price: string;

  @Column()
  created: Date;
}
