const product = {
    props: ['img', 'product'],
    data() {
        return { cartApi: this.$root.$refs.cart }
    },
    template: `
        <div class="product-item">
            <img :src="img" alt="Some img">
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}}₽</p>
                <button class="buy-btn" 
                @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>
        </div>
        `
}

const products = {
    components: { product },
    data() {
        return {
            products: [],
            imgCatalog: 'https://via.placeholder.com/200x150',
            filtered: []
        }
    },
    methods: {
        filterGoods(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(item => regexp.test(item.product_name))
        }
    },
    mounted() {
        this.$root.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    },
    template: `
        <div class="products">
            <product v-for="product of filtered"
            :key="product.id_product"
            :img="imgCatalog"
            :product="product"></product>
        </div>
    `
}
