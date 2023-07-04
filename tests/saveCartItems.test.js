const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('Testando a função saveCartItems', () => {
  it('Verifica se o método "localStorage.setItem" é chamado', () => {
    const reponse = saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Verifica se o localStorage.setItem é chamado com dois parâmetros', () => {
    const reponse = saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
