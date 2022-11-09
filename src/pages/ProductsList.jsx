import React, { Component } from 'react';
import ButtonCart from '../components/ButtonCart';
import SidebarCategories from './SidebarCategories';

export default class ProductsList extends Component {
  render() {
    return (
      <div>
        <div data-testid="home-initial-message">
          <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
          <input type="text" />
        </div>
        <ButtonCart />
        <SidebarCategories />
      </div>
    );
  }
}
