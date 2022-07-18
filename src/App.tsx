import React, { FC } from 'react';

import { useMainContext } from './components/context/mainContext';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Popup from './components/popup/Popup';
import Overlay from './components/overlay/Overlay';
import FilterProvider from './components/context/filterContext';

const App: FC = () => {
  const context = useMainContext();
  return (
    <div className="app">
      <Header />
      <FilterProvider>
        <Main />
      </FilterProvider>
      <Footer />
      {context?.isPopup && (
        <>
          <Overlay />
          <Popup>{context.popupText}</Popup>
        </>
      )}
    </div>
  );
};

export default App;
