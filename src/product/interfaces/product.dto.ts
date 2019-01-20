import { Document } from 'mongoose';

export interface Product extends Document {
  id: string;
  ean: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  price: number;
}
