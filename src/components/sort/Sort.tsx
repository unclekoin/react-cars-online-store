import React, { FC, useState } from 'react';
import triangle from '../../assets/icons/triangle.svg';
import { useFilterContext } from '../context/filterContext';
import { SortType } from '../../models/sort.model';

const sortTypes = [
  { id: 1, name: 'name', type: 'name' },
  { id: 2, name: 'price', type: 'price' },
  { id: 3, name: 'rating', type: 'rating' },
  { id: 4, name: 'release', type: 'release' },
];

const Sort: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [rotateIcon, setRotateIcon] = useState<boolean>(false);
  const context = useFilterContext();

  if (!context) return <h3>Loading...</h3>;
  const { sort, setSort } = context;

  const sortHandler = (type: string): void => {
    const data: SortType = { type, order: sort.order };
    setSort(data);
    localStorage.setItem('sort', JSON.stringify(data));
    setOpen(false);
  };

  const sortOrder = (): void => {
    setRotateIcon((prevState) => !prevState);
    if (sort.order === 'asc') {
      const data: SortType = { type: sort.type, order: 'desc' };
      setSort(data);
      localStorage.setItem('sort', JSON.stringify(data));
    } else {
      const data: SortType = { type: sort.type, order: 'asc' };
      setSort(data);
      localStorage.setItem('sort', JSON.stringify(data));
    }
  };

  if (!context) return <h3>Loading...</h3>;

  return (
    <div className="sort">
      <div className="sort__label">
        <button
          onClick={sortOrder}
          className="sort__button"
          type="button"
        >
          <img
            className={`sort__icon${rotateIcon ? ' rotate' : ''}`}
            src={triangle}
            alt=""
          />
          <b>Sort by:</b>
        </button>
        <button
          className="sort__select-button"
          onClick={() => setOpen((prevState) => !prevState)}
          type="button"
        >
          {sort.type}
        </button>
      </div>
      {open && (
        <div className="sort__popup">
          <ul className="sort__popup-list">
            {sortTypes.map((type) => (
              <li key={type.id}>
                <button
                  onClick={() => sortHandler(type.name)}
                  className={`sort__type-button${
                    sort.type === type.name ? ' active' : ''
                  }`}
                  type="button"
                >
                  {type.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
