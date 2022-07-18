import React, { FC } from 'react';
import { getStorageFilter, setStorageFilter } from '../../utils/storage-filter';
import { useFilterContext } from '../context/filterContext';

const BrandFilter: FC = () => {
  const context = useFilterContext();

  if (!context) return <h3>Loading...</h3>;

  const { brands, activeBrands, setActiveBrands } = context;

  const clickHandler = (name: string): void => {
    let [storageData, data] = getStorageFilter('brands');

    if (activeBrands.includes(name)) {
      setActiveBrands([...activeBrands.filter((item) => item !== name)]);
      data = [...activeBrands.filter((item) => item !== name)];
    } else {
      setActiveBrands([...activeBrands, name]);
      data = [...activeBrands, name];
    }

    setStorageFilter('brands', data, storageData);
  };

  return (
    <div className="brands-filter">
      <h4 className="brands-filter__title filter__title">Brands:</h4>
      <ul className="brands-filter__list filter__list">
        {brands
          .sort()
          .map((name) => (
            <ul className="brands-filter__item" key={name}>
              <button
                onClick={() => clickHandler(name)}
                className={`brands-filter__button${
                  activeBrands.includes(name) ? ' active' : ''
                }`}
                type="button"
              >
                {name}
              </button>
            </ul>
          ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
