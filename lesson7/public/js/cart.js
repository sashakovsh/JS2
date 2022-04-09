const cartItem = {
    props: ['cart_item', 'img'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="product img">
                <div class="product-desc">
                    <div class="product-title">{{ cart_item.product_name }}</div>
                    <div class="product-quantity">Кол-во {{ cart_item.quantity }}</div>
                    <div class="product-price">$ {{ cart_item.price }}</div>
                </div>
            </div>
            <div class="right-block">
                <div class="product-price">{{ cart_item.quantity * cart_item.price }}</div>
                <button class="del-btn" @click="$parent.remove(cart_item)">&times;</button>
            </div>
        </div>
    `
}

const cart = {
    components: { cartItem },
    data() {
        return {
            cartItems: [],
            imgCart: 'https://via.placeholder.com/50x50',
            isVisibleCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data) {
                    this.cartItems.push(item);
                }
            });
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
            <div class="cart-block" v-show="isVisibleCart">
                <cart-item v-for="item in cartItems" 
                :key="item.product_key"
                :img="imgCart"
                :cart_item="item"></cart-item>
            </div>
        </div>
    `
}