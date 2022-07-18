import React, { FC } from 'react';
import { Car } from '../../models/car.model';
import Card from '../../components/card/Card';
import Sidebar from '../../components/sidebar/Sidebar';
import { useFilterContext } from '../../components/context/filterContext';

const CarsPage: FC = () => {
  const context = useFilterContext();

  if (!context) return <h3>Loading...</h3>;
  const {
    filteredData, cart, sort, years, available,
  } = context;

  const data = filteredData.filter((car) => car.release >= years.min
    && car.release <= years.max
    && available.min <= car.stock
    && available.max >= car.stock);

  const key = sort.type;
  const sortData: Car[] = data.sort((a: Car, b: Car) => {
    if (sort.order === 'asc') {
      return a[key as keyof Car]! > b[key as keyof Car]! ? 1 : -1;
    }
    return a[key as keyof Car]! < b[key as keyof Car]! ? 1 : -1;
  });

  return (
    <div className="page cars-page">
      <Sidebar />
      {sortData.length ? (
        <div className="cards">
          {sortData.map((car) => (
            <Card
              key={car.id}
              {...car}
              cart={Object.keys(cart).includes(car.id)}
            />
          ))}
        </div>
      ) : (
        <h3 className="cars-page__empty-title">Sorry, no matches found!</h3>
      )}
    </div>
  );
};

export default CarsPage;
