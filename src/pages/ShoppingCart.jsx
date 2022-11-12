import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    attProducts: [],
  };

  componentDidMount() {
    if (localStorage.savedItems) {
      this.setState({
        attProducts: this.recoverLocalStorage(),
      });
    }
  }

  recoverLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('savedItems'));
    return products;
  };

  incrementProduct = (title) => {
    //  APESAR DE ESTAR FUNCIONANDO NO NOSSO SITE, NAO PASSAVA NO TESTE PORQUE
    // OS ELEMENTOS DO DOM ESTAVAM DESPONIBILIZADOS DE OUTRA MANEIRA.
    // POR ISSO, QUANDO CHAMAVAMOS O TARGET ACABAVAMOS POR RECEBER UM ELEMENTO
    // ERRADO
    // const element = target.parentNode.firstChild.innerText;

    const { attProducts } = this.state;
    // VERIFICAR SE O PRODUTO EXISTE NO LOCALSTORAGE
    const inCart = attProducts.some((product) => product.title.includes(title));
    //  SE EXISTIR ENCONTRAR PELO INDICE E AUMENTA A QNTD EM 1
    if (inCart) {
      const index = attProducts.findIndex((e) => e.title.includes(title));
      attProducts[index].quantity += 1;

      // ATUALIZA O LOCALSTORAGE
      localStorage.setItem('savedItems', JSON.stringify(attProducts));

      // ATUALIZA O ARRAY PADRÃO
      this.setState({ attProducts });
    }
  };

  decrementProduct = (title) => {
    const { attProducts } = this.state;

    const inCart = attProducts.some((product) => product.title.includes(title));
    if (inCart) {
      const index = attProducts.findIndex((e) => e.title.includes(title));
      if (attProducts[index].quantity === 1) return 1; // QUANTIDADE MINIMA NO CARRINHO

      attProducts[index].quantity -= 1;

      localStorage.setItem('savedItems', JSON.stringify(attProducts));
      this.setState({ attProducts });
    }
  };

  removeLocalStorage = (title) => {
    const { attProducts } = this.state;

    const newArrItems = attProducts.filter((product) => product.title !== title);

    localStorage.setItem('savedItems', JSON.stringify(newArrItems));
    this.setState({ attProducts: newArrItems });
  };

  render() {
    const { attProducts } = this.state;
    return (
      <div>
        {
          attProducts.length
            ? (
              attProducts.map((product) => (
                <div key={ product.title }>
                  <p data-testid="shopping-cart-product-name">
                    {product.title }
                  </p>
                  <p>
                    { product.price }
                  </p>
                  <p data-testid="shopping-cart-product-quantity">
                    { product.quantity }
                  </p>
                  <button
                    type="button"
                    onClick={ () => { this.decrementProduct(product.title); } }
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={ () => { this.incrementProduct(product.title); } }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={ () => { this.removeLocalStorage(product.title); } }
                    data-testid="remove-product"
                  >
                    Remover
                  </button>
                </div>
              ))
            )
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
      </div>
    );
  }
}
