import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ ProductsList } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route
          exact
          path="/productdetails/:id"
          render={ (props) => <ProductDetails { ...props } /> }
        />
      </Switch>
    </div>
  );
}

export default App;
