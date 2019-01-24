import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @Column() price!: number;

  @Column() completed!: boolean;

  @Column() createdAt!: Date;
}
