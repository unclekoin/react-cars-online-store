import React, { FC } from 'react';
import { getStorageFilter, setStorageFilter } from '../../utils/storage-filter';
import { useFilterContext } from '../context/filterContext';

const DoorsFilter: FC = () => {
  const context = useFilterContext();

  if (!context) return <h3>Loading...</h3>;

  const { doors, activeDoors, setActiveDoors } = context;

  const clickHandler = (num: number): void => {
    let [storageData, data] = getStorageFilter('doors');

    if (activeDoors.includes(num)) {
      setActiveDoors([...activeDoors.filter((item) => item !== num)]);
      data = [...activeDoors.filter((item) => item !== num)];
    } else {
      setActiveDoors([...activeDoors, num]);
      data = [...activeDoors, num];
    }

    setStorageFilter('doors', data, storageData);
  };

  return (
    <div className="doors-filter">
      <h4 className="doors-filter__title filter__title">Number of doors:</h4>
      <ul className="doors-filter__list filter__list">
        {doors
          .sort((a, b) => a - b)
          .map((num) => (
            <ul className="doors-filter__item" key={num}>
              <button
                onClick={() => clickHandler(num)}
                className={`doors-filter__button${
                  activeDoors.includes(num) ? ' active' : ''
                }`}
                type="button"
              >
                {num}
              </button>
            </ul>
          ))}
      </ul>
    </div>
  );
};

export default DoorsFilter;
