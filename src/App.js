import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import CheckoutProducts from './pages/CheckoutProducts';
import Resume from './pages/Resume';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route exact path="/checkoutproducts" component={ CheckoutProducts } />
        <Route exact path="/resume" component={ Resume } />
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
