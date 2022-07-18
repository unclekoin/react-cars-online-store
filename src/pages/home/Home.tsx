import React, { FC } from 'react';
import image from '../../assets/images/home-image.jpg';

const HomePage: FC = () => (
  <div className="page home-page">
    <h2 className="page__title home-page__title">Cars Shop</h2>
    <div className="warning">
      <p>
        Коллеги, после перезагрузки приложение падает, это не баг, а специфика
        react-приложения задеплоеного на GitHub Pages.
      </p>
      <p>
        Весь функционал, работает. Если еще раз открыть приложение по ссылке:
        https://unclekoin.github.io/react-cars-online-store/ все настройки
        сохраняются.
      </p>
    </div>
    <div className="home-page__wrapper">
      <div className="home-page__image">
        <img src={image} alt="" />
      </div>
    </div>
  </div>
);

export default HomePage;
