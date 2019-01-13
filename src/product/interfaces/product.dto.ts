import { Document } from 'mongoose';

export interface Product extends Document {
  _id: string;
  ean: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  price: number;
}
