import React, {
  FC, useEffect, useRef,
} from 'react';

import { useMainContext } from '../context/mainContext';
import { useFilterContext } from '../context/filterContext';

import remove from '../../assets/icons/search-remove.svg';

import Sort from '../sort/Sort';
import ColorFilter from '../filters/ColorFilter';
import DoorsFilter from '../filters/DoorsFilter';
import BrandFilter from '../filters/BrandFilter';
import RatingFilter from '../filters/RatingFilter';
import RangeSlider from '../range-slider/RangeSlider';
import { RangeSliderInterface } from '../../models/range.model';

const Sidebar: FC = () => {
  const context = useFilterContext();
  const mainContext = useMainContext();
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  if (!context || !mainContext) return <h3>Loading...</h3>;

  const {
    search,
    setSearch,
    setActiveColors,
    setActiveDoors,
    setActiveBrands,
    setRating,
    setSort,
    setCart,
    setYears,
    setAvailable,
    reset,
    setReset,
  } = context;

  const { setCartCount, setSelectedList } = mainContext;

  const rangeSliderHandler = (
    name: string,
    data: RangeSliderInterface,
    cb: (value: RangeSliderInterface) => void,
  ): void => {
    const storageData = JSON.parse(localStorage.getItem('filters') || '{}');
    storageData[name] = data;
    localStorage.setItem('filters', JSON.stringify(storageData));
    cb(data);
  };

  const resetFilters = (): void => {
    setActiveColors([]);
    setActiveDoors([]);
    setActiveBrands([]);
    setYears({ min: 2000, max: 2022 });
    setAvailable({ min: 0, max: 30 });
    setRating(false);
    setReset(!reset);
    localStorage.removeItem('filters');
  };

  const resetSettings = (): void => {
    resetFilters();
    localStorage.clear();
    setCartCount(0);
    setSort({ type: 'name', order: 'asc' });
    setSelectedList([]);
    setCart({});
    setSearch('');
  };

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__block">
          <input
            onChange={(e) => context?.setSearch(e.target.value)}
            value={context?.search}
            className="sidebar__search"
            type="text"
            placeholder="Search..."
            ref={searchInput}
            autoComplete="off"
          />
          {search && (
            <button
              className="sidebar__remove-btn"
              onClick={() => setSearch('')}
              type="button"
            >
              <img className="sidebar__remove-icon" src={remove} alt="" />
            </button>
          )}
        </div>
        <div className="sidebar__block">
          <Sort />
        </div>
        <div className="sidebar__block sidebar__block_line">
          <ColorFilter />
        </div>
        <div className="sidebar__block sidebar__block_line">
          <BrandFilter />
        </div>
        <div className="sidebar__block sidebar__block_line">
          <DoorsFilter />
        </div>
        <div className="sidebar__block sidebar__block_line">
          <RatingFilter />
        </div>
        <div className="sidebar__block sidebar__block_line">
          <RangeSlider
            name="years"
            title="Years Of Manufacture:"
            min={2000}
            max={2022}
            onChange={({ min, max }) => rangeSliderHandler('years', { min, max }, setYears)}
          />
        </div>
        <div className="sidebar__block sidebar__block_line">
          <RangeSlider
            name="stock"
            title="Quantity in stock:"
            min={0}
            max={30}
            onChange={({ min, max }) => rangeSliderHandler('stock', { min, max }, setAvailable)}
          />
        </div>
        <div className="sidebar__block sidebar__block_buttons">
          <button
            onClick={resetFilters}
            className="sidebar__reset-btn"
            type="button"
          >
            Reset Filters
          </button>
          <button
            onClick={resetSettings}
            className="sidebar__reset-btn"
            type="button"
          >
            Reset Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
