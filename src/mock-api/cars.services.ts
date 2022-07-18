import { Car } from '../models/car.model';
import cars from './cars';

const carsServices = {
  fetchAll: async (): Promise<Car[]> => Promise.resolve(cars),
  getCarsById: async (id: string): Promise<Car | undefined> => {
    const data = Promise.resolve(cars.find((car) => car.id === id));
    return data;
  },
};

export default carsServices;
