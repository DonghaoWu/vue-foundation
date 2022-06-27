import { createApp } from 'vue';
import { createStore } from 'vuex';

import router from './router.js';
import App from './App.vue';
import BaseBadge from './components/ui/BaseBadge.vue';

const productModule = {
  namespaced: true,
  state: {
    products: [
      {
        id: 'p1',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/640px-Books_HD_%288314929977%29.jpg',
        title: 'Book Collection',
        description:
          'A collection of must-read books. All-time classics included!',
        price: 99.99,
      },
      {
        id: 'p2',
        image:
          'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Tent_at_High_Shelf_Camp_cropped.jpg/640px-Tent_at_High_Shelf_Camp_cropped.jpg',
        title: 'Mountain Tent',
        description: 'A tent for the ambitious outdoor tourist.',
        price: 129.99,
      },
      {
        id: 'p3',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/640px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
        title: 'Food Box',
        description:
          'May be partially expired when it arrives but at least it is cheap!',
        price: 6.99,
      },
    ],
  },
  getters: {
    allProducts: (state) => state.products,
  },
};

const store = createStore({
  modules: {
    products: productModule,
  },
  state() {
    return {
      cart: {
        items: [],
        total: 0,
        qty: 0,
      },
    };
  },
  getters: {
    cart: (state) => state.cart,
    items: (state) => state.cart.items,
    total: (state) => state.cart.total,
    qty: (state) => state.cart.qty,
  },
  mutations: {
    addProductToCart(state, productData) {
      const productInCartIndex = state.cart.items.findIndex(
        (ci) => ci.productId === productData.productId
      );

      if (productInCartIndex >= 0) {
        state.cart.items[productInCartIndex].qty++;
      } else {
        const newItem = productData;
        state.cart.items.push(newItem);
      }
      state.cart.qty++;
      state.cart.total += productData.price;
    },
    removeProductFromCart(state, prodId) {
      const productInCartIndex = state.cart.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      );
      const prodData = state.cart.items[productInCartIndex];

      state.cart.items.splice(productInCartIndex, 1);
      state.cart.qty -= prodData.qty;
      state.cart.total -= prodData.price * prodData.qty;
    },
  },
  actions: {
    addProductToCart(context, payload) {
      context.commit('addProductToCart', payload.product);
    },
    removeProductFromCart(context, payload) {
      context.commit('removeProductFromCart', payload.prodId);
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-badge', BaseBadge);

app.mount('#app');
