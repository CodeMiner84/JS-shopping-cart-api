export interface ProductOutputModel {
  id: number;
  ean: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  price: number;
  created: Date;
}