import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { CartItem } from '../../cart/entity/cart.entity';

@Entity()
export class User {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  guid!: string;

  @ApiModelProperty()
  @Column({ length: 255, unique: true})
  username!: string;

  @ApiModelProperty()
  @Column()
  firstName!: string;

  @ApiModelProperty()
  @Column()
  lastName!: string;

  @ApiModelProperty()
  @Column({ length: 255, unique: true})
  email!: string;

  @ApiModelProperty()
  @Column()
  password!: string;

  @ApiModelProperty()
  @Column()
  created: Date;
}
