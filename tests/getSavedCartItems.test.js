const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('Testando a função getSavedCartItems', () => {
  it('Verifica se o método "localStorage.getItem" é chamado', () => {
    const reponse = getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  it('Verifica se o localStorage.getItem é chamado com "cartItems" ', () => {
    const reponse = getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
