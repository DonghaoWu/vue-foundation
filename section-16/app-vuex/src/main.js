import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

const store = createStore({
  state() {
    return {
      counter: 101,
    };
  },
  mutations: {
    increment(state) {
      state.counter = state.counter + 1;
    },
  },
});

const app = createApp(App);
app.use(store);

app.mount('#app');
