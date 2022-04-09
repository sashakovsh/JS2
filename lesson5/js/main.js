const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    searchLine: '',
    showCart: false,
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    isVisibleCart: false,
    cartItems: [],
    imgCart: 'https://via.placeholder.com/50x50',
    filtered: [],
    products: [],
    imgCatalog: 'https://via.placeholder.com/200x150'
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              const prod = Object.assign({ quantity: 1 }, product);
              this.cartItems.push(prod);
            }
          }
        })
    },
    filterGoods() {
      let regexp = new RegExp(this.searchLine, 'i');
      this.filtered = this.products.filter(item => regexp.test(item.product_name))
    },
    remove(item) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
          }
        })
    },
  },
  beforeCreated() { },
  created() {

  },
  beforeMount() { },
  mounted() {
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let item of data.contents) {
          this.cartItems.push(item);
        }
      });
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (item of data) {
          this.products.push(item);
          this.filtered.push(item);
        }
      })
    this.getJson(`getProducts.json`)
      .then(data => {
        for (item of data) {
          this.products.push(item);
          this.filtered.push(item);
        }
      })
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
});
