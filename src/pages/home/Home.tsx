import React, { FC } from 'react';
import image from '../../assets/images/home-image.jpg';

const HomePage: FC = () => (
  <div className="page home-page">
    <h2 className="page__title home-page__title">Cars Shop</h2>
    <div className="home-page__wrapper">
      <div className="home-page__image">
        <img src={image} alt="" />
      </div>
    </div>
  </div>
);

export default HomePage;
