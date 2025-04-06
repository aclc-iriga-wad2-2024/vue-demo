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
            }
        }
    },

    /** COMPUTED */
    computed: {

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
        }
    },
});

app.mount('#app');