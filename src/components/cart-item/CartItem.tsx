import React, { FC, useEffect, useState } from 'react';
import { useMainContext } from '../context/mainContext';
import { useFilterContext } from '../context/filterContext';
import { CartData } from '../../models/cart.model';
import priceFormat from '../../utils/price-format';
import icon from '../../assets/icons/delete.svg';
import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';
import { getTotalSum } from '../../utils/get-sum';

interface Props {
  id: string;
  name: string;
  price: number;
  stock: number;
  setCart: (data: CartData) => void;
  setSum: (value: number) => void;
}

const CartItem: FC<Props> = ({
  id, name, price, stock, setCart, setSum,
}) => {
  const context = useMainContext();
  const filterContext = useFilterContext();
  const [count, setCount] = useState<number>(0);

  const getStorageData = (): CartData => {
    const data = JSON.parse(localStorage.getItem('cart') || '{}');
    return data;
  };

  const getQuantity = (): void => {
    const data = getStorageData();
    setCount(data[id][0]);
  };

  useEffect(() => {
    getQuantity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeItem = (): void => {
    const data = getStorageData();
    delete data[id];
    filterContext?.setCart(data);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(data));
    context?.changeCartCount();
    setSum(getTotalSum(data));
    setCart(data);
  };

  const increaseCar = (): void => {
    const data = getStorageData();
    if (context && context.count < 20 && stock > count) {
      setCount(count + 1);
      context.setCount(context.count + 1);
      data[id][0] += 1;
      localStorage.setItem('cart', JSON.stringify(data));
      setSum(getTotalSum(data));
    } else {
      if (context && context.count === 20) {
        context.setPopupText('Sorry, all slots are filled!');
      } else {
        context?.setPopupText('Sorry, not enough goods in stock!');
      }
      context?.setPopup(true);
    }
  };

  const decreaseCar = (): void => {
    const data = getStorageData();
    if (count > 1) {
      setCount(count - 1);
      context?.setCount(context.count - 1);
      data[id][0] -= 1;
      localStorage.setItem('cart', JSON.stringify(data));
      setSum(getTotalSum(data));
    } else {
      removeItem();
    }
  };

  return (
    <li className="cart-page__item">
      <span className="cart-page__item-title">{name}</span>
      <span className="cart-page__item-price">{priceFormat(price)}</span>
      <span className="cart-page__item-quantity">
        <button onClick={decreaseCar} type="button">
          <img src={minus} alt="" />
        </button>
        <span>{count}</span>
        <button onClick={increaseCar} type="button">
          <img src={plus} alt="" />
        </button>
      </span>
      <span className="cart-page__item-subtotal">
        {priceFormat(price * count)}
      </span>
      <button
        onClick={removeItem}
        className="cart-page__item-delete-btn"
        type="button"
      >
        <img src={icon} alt="" />
      </button>
    </li>
  );
};

export default CartItem;
