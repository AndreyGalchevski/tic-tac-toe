import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Home from './components/home/Home';
import Game from './components/game/Game';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
    </div>
  );
}

export default App;
