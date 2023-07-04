require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('Testando a função fetchItem', () => {
  it('Verificando se fetchProducts é um função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se a função feach foi chamada na função fetchItem', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it('Verifica se a função fetch utiliza o endpoint correto', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Verifica se o retorno da função fetchItem passando computador como parâmetro está correto', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });
  it('Verifica se ao chamar a funçaõ fetchItem sem argumentos retor um erro', () => {
    return expect(fetchItem()).rejects.toEqual(new Error('You must provide an url'));
  });
});
