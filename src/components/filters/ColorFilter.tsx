import React, { FC } from 'react';
import { useFilterContext } from '../context/filterContext';
import check from '../../assets/icons/check.svg';
import cross from '../../assets/icons/cross.svg';
import { getStorageFilter, setStorageFilter } from '../../utils/storage-filter';

const ColorFilter: FC = () => {
  const context = useFilterContext();

  if (!context) return <h3>Loading...</h3>;
  const { colors, activeColors, setActiveColors } = context;

  const colorHandler = (color: string): void => {
    let [storageData, data] = getStorageFilter('colors');

    if (color === 'all') {
      setActiveColors([]);
      data = [];
    } else if (activeColors.includes(color)) {
      setActiveColors([...activeColors.filter((item) => item !== color)]);
      data = [...activeColors.filter((item) => item !== color)];
    } else {
      setActiveColors([...activeColors, color]);
      data = [...activeColors, color];
    }

    setStorageFilter('colors', data, storageData);
  };

  return (
    <div className="color-filter">
      <h4 className="color-filter__title filter__title">Colors:</h4>
      <ul className="color-filter__list filter__list">
        {colors.map((color) => (
          <li key={color} className="color-filter__item">
            <button
              onClick={() => colorHandler(color)}
              className="color-filter__button"
              type="button"
            >
              <span style={{ backgroundColor: color }}>
                {activeColors.includes(color) && <img className="color-filter__image" src={check} alt="" />}
              </span>
            </button>
          </li>
        ))}
        <li key="all" className="color-filter__item color-filter__item_all">
          <button
            onClick={() => colorHandler('all')}
            className="color-filter__button color-filter__button_all"
            type="button"
          >
            <span>
              <img
                className="color-filter__image color-filter__image_reset"
                src={cross}
                alt=""
              />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ColorFilter;
