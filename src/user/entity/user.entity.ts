import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { IsString, IsInt, IsDate } from 'class-validator';

@Entity()
export class User {
  @IsInt()
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @Column()
  guid!: string;

  @ApiModelProperty()
  @IsString()
  @Column({ length: 255, unique: true})
  username!: string;

  @IsString()
  @ApiModelProperty()
  @Column()
  firstName!: string;

  @IsString()
  @ApiModelProperty()
  @Column()
  lastName!: string;

  @IsString()
  @ApiModelProperty()
  @Column({ length: 255, unique: true})
  email!: string;

  @IsString()
  @ApiModelProperty()
  @Column()
  password!: string;

  @IsDate()
  @ApiModelProperty()
  @Column()
  created: Date;
}
