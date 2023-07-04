const carrinho = document.querySelector('.cart__items');
const compra = document.querySelector('.total-price');
const emptyButton = document.querySelector('.empty-cart');
let total = 0;

if (localStorage.length === 0) localStorage.setItem('Total', 0.00);
total = localStorage.getItem('Total');
total = parseFloat(total);
compra.innerText = total;

const arredondar = (num) => {
  const number = parseFloat(num) * 100;
  return Math.floor(number) / 100;
};

const addTotal = ({ price }) => {
  total += price;
  compra.innerText = arredondar(total);
};

const removeTotal = async (item) => {
  const { id } = item;
  const data = await fetchItem(`${id}`);
  const { price } = data;
  total -= price;
  compra.innerText = arredondar(total);
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText, ...id) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  e.id = id;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', id));

  return section;
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.id = id;
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  return li;
};

const listingProducts = async () => {
  const { results } = await fetchProducts('computador');
  const products = Object.entries(results);
  const items = document.querySelector('.items');
  products.forEach((item) => {
    const produto = item[1];
    const elemento = createProductItemElement(produto);
    items.appendChild(elemento);
  });
};

const addCartItem = async (item) => {
  const { id } = item;
  const data = await fetchItem(`${id}`);
  addTotal(data);
  const elemento = createCartItemElement(data);
  carrinho.appendChild(elemento);
  saveCartItems(carrinho.innerHTML);
  localStorage.setItem('Total', total);
};

const listenerAddButton = () => {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      addCartItem(event.target);
    }
  }, false);
};

const removeCartItem = (item) => {
  removeTotal(item);
  localStorage.setItem('Total', total);
  carrinho.removeChild(item);
};

const listenerCartItem = () => {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart__item')) {
      removeCartItem(event.target);
    }
  }, false);
};

const getCartItems = () => {
  const items = getSavedCartItems();
  carrinho.innerHTML = items;
};

emptyButton.addEventListener('click', () => {
  carrinho.innerHTML = '';
  total = 0;
  compra.innerText = '0.00';
  localStorage.setItem('cartItems', '');
  localStorage.setItem('Total', total);
});

const start = () => {
  listingProducts();
  getCartItems();
  listenerAddButton();
  listenerCartItem();
};

window.onload = start;
