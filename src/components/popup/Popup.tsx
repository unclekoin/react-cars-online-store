import React, { FC, ReactNode } from 'react';
import cross from '../../assets/icons/cross.svg';
import { useMainContext } from '../context/mainContext';

interface Props {
  children: ReactNode;
}

const Popup: FC<Props> = ({ children }) => {
  const context = useMainContext();

  return (
    <div className="popup">
      <button
        onClick={() => context?.setPopup(false)}
        className="popup__button"
        type="button"
      >
        <img src={cross} alt="" />
      </button>
      <h3 className="popup__title">
        { children }
      </h3>
    </div>
  );
};

export default Popup;
