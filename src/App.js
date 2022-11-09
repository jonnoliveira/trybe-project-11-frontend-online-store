import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import ProductsList from './pages/ProductsList';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ ProductsList } />
      </Switch>
    </div>
  );
}

export default App;
