import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  ean: string;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column()
  isActive: boolean;

  @Column()
  price: number;

  @Column()
  created: Date;
}
