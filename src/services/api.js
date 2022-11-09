export async function getCategories() {
  const url = fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = (await url).json();
  const data = await response;
  return data;
}
getCategories();

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  console.log(data);
  return data;
}

getProductsFromCategoryAndQuery('Agro');

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
