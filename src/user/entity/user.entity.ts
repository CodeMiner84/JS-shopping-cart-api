import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { CartItem } from '../../cart/entity/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, unique: true})
  username: string;

  @Column({ length: 255, unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  created: Date;
}
