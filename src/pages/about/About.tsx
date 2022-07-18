import React, { FC } from 'react';
import image from '../../assets/images/about-image.jpg';

const AboutPage: FC = () => (
  <div className="page about-page">
    <h2 className="page__title about-page__title">About Us</h2>
    <div className="about-page__wrapper">
      <div className="about-page__image">
        <img src={image} alt="" />
      </div>
    </div>
  </div>
);

export default AboutPage;
