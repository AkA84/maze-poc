import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import store from "./redux/store";

import './index.css';
import Game from './components/Game';

ReactDOM.render(
  <>
    <h1>
      <img src="http://cdn.trustpilot.net/brand-assets/1.7.0/logo-black.svg" height="70" alt="TrustPilot" />
    </h1>
    <Provider store={store}>
      <Game />
    </Provider>
  </>,
  document.getElementById('root')
);
