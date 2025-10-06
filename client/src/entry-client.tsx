import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const initialData = (window as any).__INITIAL_DATA__ || {};

ReactDOM.hydrateRoot(
  document.getElementById('app')!,
  <React.StrictMode>
    <BrowserRouter>
      <App initialData={initialData} />
    </BrowserRouter>
  </React.StrictMode>
);
