import React, { FC } from 'react';
import logo from '../../assets/images/rs-logo.png';

const Footer: FC = () => (
  <footer className="footer">
    <div className="container footer__container">
      <ul className="footer__list">
        <li className="footer__item">
          <a
            className="footer__link"
            href="https://github.com/unclekoin"
            target="_blank"
            rel="noreferrer"
          >
            Pavel Koryakin
          </a>
        </li>
        <li className="footer__item">
          <a
            className="footer__link"
            href="https://rs.school/js/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="footer__item-image" src={logo} alt="RSShool logo" />
          </a>
        </li>
        <li className="footer__item">2022</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
