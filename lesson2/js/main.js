'use strict';

class ProductList {
    constructor(container = '.products') {
        this._container = document.querySelector(container);
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();
        this._getTotal(); // Метод для определения стоимости всех товаров
    }

    _fetchGoods() {
        this._goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);

            this._allProducts.push(productObject);
            this._container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    _getTotal() {
        return this._goods.reduce((acc, product) => acc + product.price, 0);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
    }
}

new ProductList();

class Basket {
    addToBasket(id) { // Метод для добавления товара в корзину
    }
    removeFromBasket(id) { // Метод для удаления товара из корзины
    }
    renderBasket() { }
}

class BasketItem {
    constructor(id, name, price) {
    }

    getCount() { }
    getTotalPrice() { }
    renderBasketItem() { }
}

// Решение на 60% неидеальное, но работает на 100%.

const mainContainer = document.querySelector('.hamcontainer');
const burgerCont = [];
const checkboxEls = mainContainer.querySelectorAll('input');
const totalEl = mainContainer.querySelector('#total');

class Hamburger {
    constructor() {
        this.goods = []; // список всех вариаций еды
        this.result = []; // список выбранных позиций
        this.total; // итоговая стоимость и калорийность бургера
        this.getToppings(); // обновляем список выбранных позиций
        this.fetchGoods(); // получаем список вариаций еды
        this.renderTotal() // отрисовываем результат
    }

    getToppings() {
        checkboxEls
            .forEach(el => el.addEventListener('click', () => {
                this.result = [];
                checkboxEls.forEach(el => {
                    if (!this.result.includes(el.id)) {
                        if (el.checked) {
                            this.result.push(el.id)
                        }
                    }
                })
            }));
        return this.result;
    }
    fetchGoods() {
        this.goods = {
            big: { price: 100, calories: 40 },
            small: { price: 50, calories: 20 },
            cheese: { price: 10, calories: 20 },
            salad: { price: 20, calories: 5 },
            potato: { price: 15, calories: 10 },
            seasonings: { price: 15, calories: 0 },
            mayonnaise: { price: 20, calories: 5 }
        }

    }
    getTotal() {
        this.total = { price: 0, calories: 0 };
        for (let i = 0; i < this.result.length; i++) {
            let a = this.result[i];
            this.total.price += this.goods[a].price;
            this.total.calories += this.goods[a].calories;
        }
        return this.total;
    }
    renderTotal() {
        mainContainer.addEventListener('click', () => {
            this.getTotal();
            totalEl.textContent = (`Итоговая стоимость: ${this.total.price} 
            калорийность: ${this.total.calories}`)
        })
    }
}

new Hamburger();