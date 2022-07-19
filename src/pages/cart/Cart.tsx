import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../../models/car.model';
import { CartData } from '../../models/cart.model';
import { useMainContext } from '../../components/context/mainContext';
import { useFilterContext } from '../../components/context/filterContext';

import CartItem from '../../components/cart-item/CartItem';

import priceFormat from '../../utils/price-format';
import carsServices from '../../mock-api/cars.services';
import { getTotalSum } from '../../utils/get-sum';

const CartPage: FC = () => {
  const context = useMainContext();
  const filterContext = useFilterContext();
  const [cart, setCart] = useState<CartData>({});
  const [cars, setCars] = useState<Car[] | []>([]);
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: Car[] = await carsServices.fetchAll();
        setCars(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchData();
    const data: CartData = JSON.parse(localStorage.getItem('cart') || '{}');
    const totalSum = getTotalSum(data);
    setSum(totalSum);
    setCart(data);
  }, []);

  const filteredData = cars.filter((car) => Object.keys(cart).includes(car.id));

  const clearCart = (): void => {
    localStorage.removeItem('cart');
    context?.setCount(0);
    filterContext?.setCart({});
    setCart({});
    setSum(0);
  };

  if (!context?.count) return <h2 className="page-title">Unfortunately, the cart is empty (</h2>;

  return (
    <div className="page cart-page">
      <div className="cart-page__title cart-page__item">
        <span className="cart-page__item-title">Name</span>
        <span className="cart-page__item-price">Price</span>
        <span className="cart-page__item-quantity">Quantity</span>
        <span className="cart-page__item-subtotal">Subtotal</span>
      </div>
      <ul className="cart-page__list">
        {filteredData.map((car) => (
          <CartItem
            key={car.id}
            id={car.id}
            name={car.name}
            price={car.price}
            stock={car.stock}
            setCart={setCart}
            setSum={setSum}
          />
        ))}
      </ul>
      <div className="cart-page__title cart-page__item">
        <span className="cart-page__item-title" />
        <span className="cart-page__item-price" />
        <span className="cart-page__item-quantity cart-page__item-quantity_big">
          Order Total:
        </span>
        <span className="cart-page__item-subtotal cart-page__item-subtotal_big">
          {priceFormat(sum)}
        </span>
      </div>
      <div className="cart-page__button-group">
        <Link
          to="/cars"
          className="cart-page__btn cart-page__btn_left"
          type="button"
        >
          Continue Shopping
        </Link>
        <button onClick={clearCart} className="cart-page__btn cart-page__btn_right" type="button">
          Clear Shopping Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
