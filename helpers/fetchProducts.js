const endpointItem = (item) => `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

const fetchProducts = async (item) => {
  const url = endpointItem(item);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
