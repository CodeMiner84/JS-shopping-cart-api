import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt, IsDate, IsNumber, IsBoolean } from 'class-validator';

@Entity()
export class Product {
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @Column({ length: 50 }) ean!: string;

  @IsString()
  @Column({ length: 255 }) title!: string;

  @IsString()
  @Column('text') description!: string;

  @IsString()
  @Column() image!: string;

  @IsBoolean()
  @Column() isActive!: boolean;

  @IsNumber()
  @Column() price!: number;

  @IsDate()
  @Column() created!: Date;
}
