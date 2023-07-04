const endpointId = (item) => `https://api.mercadolibre.com/items/${item}`;

const fetchItem = async (item) => {
  const url = endpointId(item);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
