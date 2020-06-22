import React from 'react';
import './App.css';
import Board from './Board.jsx';
import Login, {useAuth} from './login.jsx';


function App() {
  let layout = require('./initialLayout.json');
  
  return (
    <div className="App">
      <Board layout={layout} />
    </div>
  );
}

export default App;
