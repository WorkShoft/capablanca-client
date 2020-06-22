import React from 'react';
import AppRouter from './Router.jsx';
import './App.css';


function App() {
  let layout = require('./initialLayout.json');  
  return (
    <AppRouter layout={layout}/>
  );

}

export default App;
