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
        }
    },
});

app.mount('#app');