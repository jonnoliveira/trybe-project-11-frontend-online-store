import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ ProductsList } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
      </Switch>
    </div>
  );
}

export default App;
