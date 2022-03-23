const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    imgCart: 'https://via.placeholder.com/50x50',
    searchLine: '',
    showCart: false,
  },
  components: { cart, filter_el, products },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
  },
});
