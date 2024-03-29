import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import MainProvider from './components/context/mainContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <HashRouter>
    <MainProvider>
      <App />
    </MainProvider>
  </HashRouter>,
);
