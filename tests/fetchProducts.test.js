require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('Testando a função fetchProducts', () => {
  it('Verificando se fetchProducts é um função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifica se a função feach foi chamada na função fetchProducts', async () => {
    const response = await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('Verifica se a função fetch utiliza o endpoint correto', async () => {
    const response = await fetchProducts('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Verifica se o retorno da função fetchProducts passando computador como parâmetro está correto', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  it('Verifica se ao chamar a funçaõ fetchProducts sem argumentos retor um erro', () => {
    return expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  });
});
