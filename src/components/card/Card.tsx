import React, { FC, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../context/mainContext';
import { Car } from '../../models/car.model';
import priceFormat from '../../utils/price-format';

import image from '../../assets/images/car.png';
import badge from '../../assets/icons/cart-badge.svg';
import star from '../../assets/icons/star.svg';
import redStar from '../../assets/icons/red-star.svg';
import arrow from '../../assets/icons/arrow.svg';

const Card: FC<Car> = ({
  id,
  name,
  description,
  release,
  rating,
  price,
  body,
  color,
  stock,
  cart,
}) => {
  const style = { '--rating': rating } as CSSProperties;
  const navigate = useNavigate();
  const context = useMainContext();

  if (!context) return <h3>Loading...</h3>;
  const { selectedList, setSelectedList } = context;

  const toggleSelected = (): void => {
    const data = JSON.parse(localStorage.getItem('selected') || '[]');
    if (!selectedList.includes(id)) {
      data.push(id);
      setSelectedList([...selectedList, id]);
      localStorage.setItem('selected', JSON.stringify(data));
    } else {
      const newData = data.filter((carId: string) => carId !== id);
      setSelectedList(newData);
      localStorage.setItem('selected', JSON.stringify(newData));
    }
  };

  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt="" />
      </div>
      <div className="card__info">
        <h3 className="card__title">{name}</h3>
        <p className="card__description">{`${description.slice(0, 150)}...`}</p>
        <span className="card__body">{body}</span>
        <span className="card__release">{`${release} year`}</span>
        <span className="card__available">
          Available:
          {' '}
          { stock }
        </span>
        <span className="card__color" style={{ backgroundColor: color }} />
        <span className="card__price">{priceFormat(price)}</span>
        <button
          onClick={() => navigate(`/cars/${id}`)}
          className="btn card__btn"
          type="button"
        >
          <img src={arrow} alt="arrow" />
        </button>
        <span className="card__stars" style={style} />
      </div>
      <button
        onClick={toggleSelected}
        className="card__selected-btn"
        type="button"
      >
        <img src={selectedList.includes(id) ? redStar : star} alt="star" />
      </button>
      {cart && <img className="card__cart-badge" src={badge} alt="cart" />}
    </div>
  );
};

export default Card;
