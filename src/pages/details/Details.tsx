import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useMainContext } from '../../components/context/mainContext';
import { Car } from '../../models/car.model';
import { CartData } from '../../models/cart.model';

import image from '../../assets/images/big-car.png';
import arrow from '../../assets/icons/arrow.svg';
import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';

import carsServices from '../../mock-api/cars.services';
import priceFormat from '../../utils/price-format';
import { useFilterContext } from '../../components/context/filterContext';

const DetailsPage: FC = () => {
  const context = useMainContext();
  const filterContext = useFilterContext();
  const navigate = useNavigate();
  const { carId } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [localCount, setLocalCount] = useState(1);

  useEffect(() => {
    const fetchData = async (id: string): Promise<void> => {
      const data: Car | undefined = await carsServices.getCarsById(id);
      if (data) setCar(data);
    };

    if (carId) {
      fetchData(carId);
    }
  }, [carId]);

  if (!context) return <>Loading...</>;

  const isSlot = (): boolean => context.count + localCount <= 20;

  const getData = (): [data: CartData, amount: number] => {
    const data: CartData = JSON.parse(localStorage.getItem('cart') || '{}');
    const amount: number | 0 = data[carId || '']?.[0] || 0;

    return [data, amount];
  };

  const increaseCount = (): void => {
    const [, amount] = getData();
    if (!isSlot() && context) {
      context.setPopup(true);
      context.setPopupText('Sorry, all slots are filled!');
      return;
    }
    if (car && car.stock > amount + localCount) {
      setLocalCount(localCount + 1);
    } else {
      context.setPopup(true);
      context.setPopupText('Sorry, not enough goods in stock!');
    }
  };

  const decreaseCount = (): void => {
    if (localCount > 1) setLocalCount(localCount - 1);
  };

  const addToCart = (): void => {
    if (!isSlot() && context) {
      context.setPopup(true);
      context.setPopupText('Sorry, all slots are filled!');
      return;
    }

    if (car && carId) {
      const [data, amount] = getData();

      if (car.stock >= amount + localCount) {
        data[carId] = data[carId] ? [data[carId][0] + localCount, car.price] : [localCount, car.price];
        localStorage.setItem('cart', JSON.stringify(data));
        context.increase(localCount);
        filterContext?.setCart(data);
        navigate('/cart');
      }
    }
  };

  return (
    <div className="page details-page">
      {car && (
        <div className="details-page__body">
          <button onClick={() => navigate(-1)} className="btn details-page__btn" type="button">
            <img src={arrow} alt="arrow" />
          </button>
          <div className="details-page__body-wrapper">
            <div className="details-page__body-imag">
              <img src={image} alt={car.model} />
            </div>
            <div className="details-page__body-info">
              <h2 className="page__title details-page__title">
                {car.name}
              </h2>
              <span className="details-page__body-price">
                {priceFormat(car.price)}
              </span>
              <p className="details-page__body-description">
                {car.description}
              </p>
              <div className="details-page__body-info-block">
                <span>Body style:</span>
                <span>{car.body}</span>
              </div>
              <div className="details-page__body-info-block">
                <span>Year:</span>
                <span>{car.release}</span>
              </div>
              <div className="details-page__body-info-block">
                <span>Color:</span>
                <span className="details-page__car-color" style={{ backgroundColor: car.color }} />
              </div>
              <div className="details-page__body-info-block">
                <span>Available:</span>
                <span>{car.stock}</span>
              </div>
              <div className="details-page__body-line" />
              <div className="details-page__body-btn-group">
                <div className="details-page__body-buttons">
                  <button
                    className="details-page__body-btn"
                    onClick={decreaseCount}
                    type="button"
                    disabled={localCount <= 1}
                  >
                    <img src={minus} alt="minus" />
                  </button>
                  <span className="details-page__body-count">{localCount}</span>
                  <button onClick={increaseCount} type="button">
                    <img src={plus} alt="plus" />
                  </button>
                </div>
                <button
                  onClick={addToCart}
                  className="details-page__body-add-btn"
                  type="button"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
