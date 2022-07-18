import React, { FC } from 'react';
import { getStorageFilter, setStorageFilter } from '../../utils/storage-filter';
import { useFilterContext } from '../context/filterContext';
import check from '../../assets/icons/check.svg';

const RatingFilter: FC = () => {
  const context = useFilterContext();

  if (!context) return <h3>Loading...</h3>;

  const { rating, setRating } = context;

  const toggleRating = (): void => {
    let [storageData, data] = getStorageFilter('rating');

    setRating(!data);

    setStorageFilter('rating', !data, storageData);
  };

  return (
    <div className="rating-filter">
      <h4 className="rating-filter__title filter__title">Only Popular:</h4>
      <button
        onClick={toggleRating}
        className="rating-filter__button"
        type="button"
      >
        <span>
          {rating && <img src={check} alt="" />}
        </span>
      </button>
    </div>
  );
};

export default RatingFilter;
