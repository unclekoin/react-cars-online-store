import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../assets/icons/cart.svg';
import { useMainContext } from '../context/mainContext';

const Cart: FC = () => {
  const context = useMainContext();
  return (
    <Link className="cart header__link" to="/cart">
      <span className="cart__text header__link-text">Cart</span>
      <img className="cart__image header__link-image" src={cart} alt="cart" />
      {context && context.count !== 0 && <span className="cart__badge">{context.count}</span>}
    </Link>
  );
};

export default Cart;
