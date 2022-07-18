export interface Car {
  id: string;
  name: string;
  model: string;
  brand: string;
  description: string;
  release: number;
  image: string;
  color: string;
  body: string;
  doors: number;
  price: number;
  stock: number;
  rating: number;
  cart?: boolean;
}
