export async function getCategories() {
  const url = fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = (await url).json();
  const data = await response;
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  // const data = await response.json();
  // return data;
  if (categoryId && !query) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  if (query && !categoryId) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const data = await response.json();
  console.log(data);
  return data;
}

getProductById('MLB2685532219');
