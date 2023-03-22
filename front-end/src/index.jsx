import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App.jsx';
import {BrowserRouter, RouterProvider} from 'react-router-dom';
import {getRouter} from "./util/Routing.mjs";

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
        {/*<RouterProvider router={getRouter()}/>*/}
        <App />
    </React.StrictMode>
  </BrowserRouter>
);
