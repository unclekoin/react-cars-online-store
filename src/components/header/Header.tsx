import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cart from '../cart/Cart';

const Header: FC = () => (
  <div className="header">
    <div className="container header__container">
      <h1 className="logo header__logo">
        <Link to="/" className="logo__link">
          Cars
          <span className="logo__second-element">Shop</span>
        </Link>
      </h1>
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <NavLink
            className={({ isActive }) => isActive ? 'header__link active' : 'header__link'}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink
            className={({ isActive }) => isActive ? 'header__link active' : 'header__link'}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink
            className={({ isActive }) => isActive ? 'header__link active' : 'header__link'}
            to="/cars"
          >
            Cars
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink
            className={({ isActive }) => isActive ? 'header__link active' : 'header__link'}
            to="/selected"
          >
            Selected
          </NavLink>
        </li>
      </ul>
      <Cart />
    </div>
  </div>
);

export default Header;
