const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: "/catalogData.json",
        products: [],
        imgCatalog: "img/product-1.png",
        searchLine: "",

        isVisibleCart: false,
        cartItems: [],
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then((result) => result.json())
                .catch((error) => {
                    console.log(error);
                });
        },
        // Basket
        toggleCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        addProduct(product) {
            let find = this.cartItems.find(
                (p) => p.id_product === product.id_product
            );
            if (find) {
                find.quantity++;
                //this._updateCart(find);
            } else {
                this.cartItems.push({
                    id_product: product.id_product,
                    price: +product.price,
                    product_name: product.product_name,
                    quantity: 1,
                });
            }
            //console.log(product.id_product);
        },
        deleteProduct(product) {
            this.cartItems = this.cartItems.filter(
                (p) => p.id_product !== product.id_product
            );
        },
        FilterGoods() {
            console.log(this.searchLine);
        },

        calcProduct(product) {
            return product.price * product.quantity;
        },
    },
    beforeCreate() {},
    created() {
        this.getJson(`${API + this.catalogUrl}`).then((data) => {
            for (let el of data) {
                this.products.push(el);
            }
        });
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
});