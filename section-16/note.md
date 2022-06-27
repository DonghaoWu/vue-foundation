1. vuex

2. replacing provide/inject

3. vuex is a library for managing global state

4. state => local state / global state

5. creating & using a store

6. git

```bash
$ npm run serve
```

7. App.vue

```html
<template>
  <base-container title="Vuex">
    <h3>{{ $store.state.counter }}</h3>
    <button>Add 1</button>
  </base-container>
</template>

<script>
  import BaseContainer from './components/BaseContainer.vue';

  export default {
    components: {
      BaseContainer,
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
  }

  body {
    margin: 0;
  }
</style>
```

- main.js

```js
import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

const store = createStore({
  state() {
    return {
      counter: 100,
    };
  },
});

const app = createApp(App);
app.use(store);

app.mount('#app');
```

8. connectin components to state

```html
<template>
  <base-container title="Vuex">
    <h3>{{ counter }}</h3>
    <button @click="addOne">Add 1</button>
  </base-container>
</template>

<script>
  import BaseContainer from './components/BaseContainer.vue';

  export default {
    components: {
      BaseContainer,
    },
    computed: {
      counter() {
        return this.$store.state.counter;
      },
    },
    methods: {
      addOne() {
        this.$store.state.counter++;
      },
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
  }

  body {
    margin: 0;
  }
</style>
```

- TheCounter.vue

```html
<template>
  <h3>{{ counter }}</h3>
</template>

<script>
  export default {
    computed: {
      counter() {
        return this.$store.state.counter;
      },
    },
  };
</script>

<style></style>
```

- App.vue

```html
<template>
  <base-container title="Vuex">
    <the-counter></the-counter>
    <button @click="addOne">Add 1</button>
  </base-container>
</template>

<script>
  import BaseContainer from './components/BaseContainer.vue';
  import TheCounter from './components/TheCounter';

  export default {
    components: {
      BaseContainer,
    },
    methods: {
      addOne() {
        this.$store.state.counter++;
      },
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
  }

  body {
    margin: 0;
  }
</style>
```

9. Mutation ===> methods

- 目前来说我们使用的方法跟 redux 一样，也就是在 main.js 中注册 store，然后在 component 中引用 `this.$store.state.counter++;`

- ChangeCounter.vue

```js
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
```

- App.vue

```js
    methods: {
      addOne() {
        this.$store.commit('increment');
      },
    },
```

10. passing data to mutations with Payloads

- main.js

```js
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
    myIncrement(state, payload) {
      state.counter = state.counter + payload.value;
    },
  },
});

const app = createApp(App);
app.use(store);

app.mount('#app');
```

- App.vue

```js
methods: {
  addOne() {
    this.$store.commit('increment');
  },
  myAdd(){
    this.$store.commit('myIncrement', { value: 10})
    this.$store.commit({
      type: 'myIncrement',
      value: 10
    })
  }
},
```

11. getter ===> computed

- main.js

```js
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
    myIncrement(state, payload) {
      state.counter = state.counter + payload.value;
    },
  },
  getters: {
    finalCounter(state) {
      return state.counter * 2;
    },
    normalizedCounter(state, getters) {
      // const finalCounter = state.counter * 3;
      const finalCounter = getters.finalCounter;
      if (finalCounter < 0) {
        return 0;
      }
      if (finalCounter > 100) {
        return 1;
      }
      return finalCounter;
    },
  },
});

const app = createApp(App);
app.use(store);

app.mount('#app');
```

- FavoriteValue.vue

```html
<template>
  <div>
    <h3>{{ counter }}</h3>
    <p>This is Favorite.vue</p>
  </div>
</template>

<script>
  export default {
    computed: {
      counter() {
        return this.$store.getters.finalCounter;
      },
    },
  };
</script>

<style></style>
```

12. running async code with actions

- actions ==> async code + mutation
- mutation must be sync.
- main.js
- actions => dispatch
- mutation => commit

```js
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
    myIncrement(state, payload) {
      state.counter = state.counter + payload.value;
    },
  },
  actions: {
    incrementAction(context) {
      context.commit('increment');
    },
    myIncrementAction(context) {
      context.commit('increment', payload.value);
    },
  },
  getters: {
    finalCounter(state) {
      return state.counter * 2;
    },
    normalizedCounter(state, getters) {
      const finalCounter = getters.finalCounter;
      if (finalCounter < 0) {
        return 0;
      }
      if (finalCounter > 100) {
        return 1;
      }
      return finalCounter;
    },
  },
});

const app = createApp(App);
app.use(store);

app.mount('#app');
```

- App.vue

```js
methods: {
  addOne() {
    this.$store.commit('increment');
  },
  myAdd(){
    // this.$store.dispatch('myIncrement', { value: 10})
    this.$store.dispatch({
      type: 'myIncrement',
      value: 10
    })
  }
},
```

13. understangding the action context

- main.js

```js

```

14. Using Mapper Helpers

- TheCounter.vue

```html
<template>
  <h3>{{ counter }}</h3>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['finalCounter']),
    },
  };
</script>

<style></style>
```

- ChangeCounter.vue

```html
<template>
  <button @click="myIncrementAction({value: 10})">Add 1</button>
</template>

<script>
  import { mapActions } from 'Vuex';
  export default {
    methods: {
      ...mapActions(['increment', 'myIncrementAction']),
      // ...mapActions({
      //   inc: 'increment',
      // }),
    },
  };
</script>

<style></style>
```

15. example: adding more state

- main.js

```js
import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

const store = createStore({
  state() {
    return {
      counter: 101,
      isLoggedIn: false,
    };
  },
  mutations: {
    increment(state) {
      state.counter = state.counter + 1;
    },
    myIncrement(state, payload) {
      state.counter = state.counter + payload.value;
    },
    setAuth(state, payload) {
      state.isLoggedIn = payload.isAuth;
    },
  },
  actions: {
    incrementAction(context) {
      context.commit('increment');
    },
    myIncrementAction(context) {
      context.commit('increment', payload.value);
    },
    login(context) {
      context.commit('setAuth', { isAuth: true });
    },
    logout(context) {
      context.commit('setAuth', { isAuth: false });
    },
  },
  getters: {
    finalCounter(state) {
      return state.counter * 2;
    },
    normalizedCounter(state, getters) {
      const finalCounter = getters.finalCounter;
      if (finalCounter < 0) {
        return 0;
      }
      if (finalCounter > 100) {
        return 1;
      }
      return finalCounter;
    },
    userIsAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
});

const app = createApp(App);
app.use(store);

app.mount('#app');
```

- UserAuth.vue

```html
<template>
  <div>
    <button @click="login" v-if="!isAuth">Login</button>
    <button @click="logout" v-if="isAuth">Logout</button>
  </div>
</template>

<script>
  import { mapGetters, MapActions } from 'vuex';
  export default {
    methods: {
      login() {
        this.$store.dispatch('login');
      },
      logout() {
        this.$store.disaptch('logout');
      },
    },
    computed: {
      isAuth() {
        return this.$store.getters.userIsAuthenticated;
      },
    },
  };
</script>

<style></style>
```

16. organizing your store with modules

```js
const counterModule = {
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
};

const store = createStore({
  modules: {
    counter: counterModule,
  },
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {},
  actions: {},
  getters: {},
});
```

17. Understanding Local Module State

- 就算是 mege 之后的 state 也不能在 getter 中共用 state，所以这也算是一个短板。
- 如果你需要使用全局的 state 数据，那么要使用第三和第四参数，如

```js
testAuth(state, getters, rootState, rootGetters){
  return
}
```

18. Naespacing Modules

- 如果不同的 modules 合并一起的时候有重名要怎么处理？

```js
const counterModule = {
  namespaced: true,
  state() {
    return {
      counter: 0,
    };
  },
};
```

```js
computed:{
  counter(){
    return this.$store.getters['numbers/normalizedCounter']
  }
}

...mapGetters('numbers', ['finalCounter'])

...mapActions('numbers', {
  inc: 'increment',
  increase:'myInc'
})

addOne(){
  this.store.dispatch({
    type:'numbers/increse',
    value: 10
  })
}
```

19. structuring vuex code & Files

- main.js

```js
import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';
import store from './store.js';

const app = createApp(App);
app.use(store);

app.mount('#app');
```

- store/index.js

```js

```
