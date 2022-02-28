const products = [
  { id: 1, title: 'Notebook', price: 1000, img: 'https://picsum.photos/300/200' },
  { id: 2, title: 'Mouse', price: 100, img: 'https://picsum.photos/300/200' },
  { id: 3, title: 'Keyboard', price: 250, img: 'https://picsum.photos/300/200' },
  { id: 4, title: 'Gamepad', price: 150, img: 'https://picsum.photos/300/200' },
  { id: 5, title: 'Monitor', img: 'https://picsum.photos/300/200' },
];

// знаю, что не по заданию, но не удержался
const isNum = (n) => {
  if (Number.isInteger(n)) {
    return
  }
  return 'disabled="true"'
}

const renderProduct = (title, price = 'нет в наличии', img) => {
  return `
    <div class="product-item">
      <h3>${title}</h3>
      <img src="${img}" alt="pic">
      <p>${price}</p>
      <button class="by-btn" ${isNum(price)}>Добавить</button >
    </div > `;
};

// Из-за того что map создает новый массив мы и видим запятые на странице. 
// Решается все слиянием элементов в единую строку методом join()
const renderProducts = list => {
  document.querySelector('.products').innerHTML = list.map(
    item => renderProduct(item.title, item.price, item.img)).join('');
};

renderProducts(products);
