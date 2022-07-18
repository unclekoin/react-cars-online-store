import { CartData } from '../models/cart.model';

export const getTotalSum = (data: CartData): number => {
  const sum = Object.values(data)
    .map((item) => item[0] * item[1])
    .reduce((acc, value) => acc + value, 0);

  return sum;
};
