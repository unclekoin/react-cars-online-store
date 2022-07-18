import React, { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import AboutPage from '../../pages/about/About';
import CarsPage from '../../pages/cars/Cars';
import CartPage from '../../pages/cart/Cart';
import DetailsPage from '../../pages/details/Details';
import HomePage from '../../pages/home/Home';
import NoteFoundPage from '../../pages/not-found/NotFound';
import SelectedPage from '../../pages/selected/Selected';

const Main: FC = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={`wrapper${
        pathname.split('/').length > 2 ? ' wrapper_white' : ''
      }`}
    >
      <div className="main container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:carId" element={<DetailsPage />} />
          <Route path="/selected" element={<SelectedPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NoteFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
