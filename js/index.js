const app = Vue.createApp({
    /** DATA */
    data() {
        return {
            tabs: {
                items: [
                    { key: 'shop'    , label: 'Shop'     },
                    { key: 'cart'    , label: 'Cart'     },
                    { key: 'checkout', label: 'Checkout' },
                ],
                active: 0
            },

            products: [
                {
                    id   : 1,
                    name : 'Safeguard',
                    price: 22,
                    stocks: 10
                },
                {
                    id   : 2,
                    name : 'Lucky Me',
                    price: 12,
                    stocks: 5
                },
                {
                    id    : 3,
                    name  : 'Ligo Sardines',
                    price : 27,
                    stocks: 10
                },
                {
                    id    : 4,
                    name  : 'Modess',
                    price : 5,
                    stocks: 100
                },
                {
                    id    : 5,
                    name  : 'Great Taste Black',
                    price : 2000,
                    stocks: 1
                },
                {
                    id    : 6,
                    name  : 'Colgate',
                    price : 10,
                    stocks: 13
                }
            ],

            cart: [] /** [
                [
                    id      : 1,
                    name    : 'Product Name 1',
                    price   : 100,
                    quantity: 1
                ],
                [
                    id      : 2,
                    name    : 'Product Name 2',
                    price   : 200,
                    quantity: 2
                ]
                ...
            ] */
        }
    },

    /** COMPUTED */
    computed: {
        /**
         * @computed activeTab
         * @description The active tab object.
         * @returns {Object}
         */
        activeTab() {
            return this.tabs.items[this.tabs.active];
        },

        /**
         * @computed inShopTab
         * @description The active tab is 'shop'
         * @returns {boolean}
         */
        inShopTab() {
            return this.activeTab.key === 'shop';
        },

        /**
         * @computed inCartTab
         * @description The active tab is 'cart'
         * @returns {boolean}
         */
        inCartTab() {
            return this.activeTab.key === 'cart';
        },

        /**
         * @computed inCheckoutTab
         * @description The active tab is 'checkout'
         * @returns {boolean}
         */
        inCheckoutTab() {
            return this.activeTab.key === 'checkout';
        },

        /**
         * @computed cartTotalProducts
         * @description The total products in cart.
         * @returns {number}
         */
        cartTotalProducts() {
            return this.cart.length;
        },

        /**
         * @computed cartTotalAmount
         * @description The total amount of cart products.
         * @returns {number}
         */
        cartTotalAmount() {
            let total = 0;
            for (let i = 0; i < this.cart.length; i++) {
                total += this.cart[i].price * this.cart[i].quantity;
            }

            return total;
        }
    },

    /** METHODS */
    methods: {
        /**
         * @method activateTab
         * @description Activate the tab of the given tabIndex.
         * @param {number} tabIndex
         */
        activateTab(tabIndex) {
            this.tabs.active = tabIndex;
        },

        /**
         * @method addToCart
         * @description Add the given product object to the cart.
         * @param {Object} product
         */
        addToCart(product) {
            if (product.stocks <= 0) {
                alert("No more available stocks for '" + product.name + "'.")
                return;
            }
            // check if the product is already in the cart
            let foundProduct = null;
            for (let i = 0; i < this.cart.length; i++) {
                const cartProduct = this.cart[i];
                if (cartProduct.id === product.id) {
                    foundProduct = cartProduct;
                    break;
                }
            }

            // if the product is found, just add the quantity
            if (foundProduct !== null) {
                foundProduct.quantity += 1;
                foundProduct.totalPrice += product.price;
            }

            // otherwise, add the product to the cart
            else {
                this.cart.push({
                    id      : product.id,
                    name    : product.name,
                    price   : product.price,
                    quantity: 1
                });
            }

            // reduce the product stocks by 1
            product.stocks = product.stocks - 1;
        },

        /**
         * @method removeFromCart
         * @description Remove the product from cart with the given product index.
         * @param {number} cartProductIndex
         */
        removeFromCart(cartProductIndex) {
            // reference the cart product
            const cartProduct = this.cart[cartProductIndex];

            if (confirm("Are you sure to remove '" + cartProduct.name + "' from your cart?")) {
                // return the stocks of the cart product
                for (let i = 0; i < this.products.length; i++) {
                    if (cartProduct.id === this.products[i].id) {
                        this.products[i].stocks += cartProduct.quantity;
                    }
                }

                // remove the cart product
                this.cart.splice(cartProductIndex, 1);
            }
        },

        /**
         * @method increaseCartQuantity
         * @description Increase the quantity of a cart product.
         * @param {Object} cartProduct
         */
        increaseCartQuantity(cartProduct) {
            // find the product, and add it to cart
            for (let i = 0; i < this.products.length; i++) {
                if (cartProduct.id === this.products[i].id) {
                    this.addToCart(this.products[i]);
                    break;
                }
            }
        },

        /**
         * @method decreaseCartQuantity
         * @description Decrease the quantity of a cart product.
         * @param {Object} cartProduct
         * @param {number} cartProductIndex
         */
        decreaseCartQuantity(cartProduct, cartProductIndex) {
            // if quantity is 1, remove it from cart
            if (cartProduct.quantity <= 1) {
                this.removeFromCart(cartProductIndex);
            }

            // otherwise, just decrease its quantity and return the stock
            else {
                cartProduct.quantity -= 1;

                // return the stock
                for (let i = 0; i < this.products.length; i++) {
                    if (cartProduct.id === this.products[i].id) {
                        this.products[i].stocks += 1;
                        break;
                    }
                }
            }
        }
    },
});

app.mount('#app');