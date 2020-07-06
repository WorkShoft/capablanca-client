import { hot } from 'react-hot-loader/root';

import React from 'react';
import AppRouter from './Router.jsx';
require('./App.css');


function App() {
  return (
    <AppRouter />
  );
}

export default hot(App);
