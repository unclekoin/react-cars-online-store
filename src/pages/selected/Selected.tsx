import React, { FC, useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import { useMainContext } from '../../components/context/mainContext';
import carsServices from '../../mock-api/cars.services';
import { Car } from '../../models/car.model';
import { CartData } from '../../models/cart.model';

const SelectedPage: FC = () => {
  const [cars, setCars] = useState<Car[] | []>([]);
  const [cart, setCart] = useState<CartData>({});
  const context = useMainContext();

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('selected') || '[]');

    const fetchData = async (): Promise<void> => {
      try {
        const data = await carsServices.fetchAll();

        setCars(data.filter((car) => storageData.includes(car.id)));
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);

    fetchData();
  }, []);

  if (!context) return <h3>Loading...</h3>;
  const { selectedList } = context;

  const selectedData = cars.filter((car) => selectedList.includes(car.id));

  return (
    <div className="page selected-page">
      {cars.length ? (
        <div className="selected-page__cards">
          {selectedData.map((car) => (
            <Card
              key={car.id}
              {...car}
              cart={Object.keys(cart).includes(car.id)}
            />
          ))}
        </div>
      ) : (
        <h3 className="selected-page__empty-title">Unfortunately, you didn&apos;t choose anything!</h3>
      )}
    </div>
  );
};

export default SelectedPage;
