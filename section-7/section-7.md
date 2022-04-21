# Vue development tools (Part 7)

### `Key Word: component structure.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Vue Basics)

### `Summary`: In this documentation, we learn basic of component.

### `Check Dependencies & Tools:`

- null

#### `本章背景：`

- 本章关于 3 种不同的 component 组织形式

- **要点**

  -

### <span id="1.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [1.1 Vue Cli commands.](#1.1)
- [1.2 Component Form 1.](#1.2)
- [1.3 Component Form 2.](#1.3)
- [1.4 Component Form 3.](#1.4)

---

### <span id="1.1">`Step1: Vue Cli commands.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

1. create a Vue app.

```bash
$ node -v
$ npm install -g @vue/cli
$ cd <yourFolder>
$ vue create vue-first-app

# manuall select features => Choose version, Babel, Linter => 3.x => basic => Lint on save => In dedicated config files => no preset

$ cd vue-first-app
$ npm run serve
# go to localhost 8080
```

---

### <span id="1.2">`Step2: Component Form 1.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 这种形式是直接添加 component，主要语法是

  ```diff
  + app.component('friend-contact', {...})
  ```

  2. index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vue Basics</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="styles.css" />
      <script src="https://unpkg.com/vue@next" defer></script>
      <script src="app.js" defer></script>
    </head>
    <body>
      <header>
        <h1>FriendList</h1>
      </header>
      <section id="app">
        <ul>
          <friend-contact
            v-for="friend in friends"
            :friend="friend"
            :key="friend.id"
          ></friend-contact>
        </ul>
      </section>
    </body>
  </html>
  ```

  3. app.js

  ```js
  const app = Vue.createApp({
    data() {
      return {
        friends: [
          { id: 001, name: 'Tom', phone: '12345', email: '123@123.com' },
          { id: 002, name: 'Mary', phone: '222', email: '222@222.com' },
          { id: 003, name: 'Joe', phone: '333', email: '333@333.com' },
        ],
      };
    },
    methodes: {},
  });

  app.component('friend-contact', {
    props: ['friend'],
    template: `
        <li>
        <h2>{{friend.name}}</h2>
        <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show'}} Details</button>
        <ul v-if='detailsAreVisible'>
          <li><strong>Phone:</strong> {{friend.phone}}</li>
          <li><strong>Email:</strong> {{friend.email}}</li>
        </ul>
      </li>
    `,
    data() {
      return {
        detailsAreVisible: false,
      };
    },
    methods: {
      toggleDetails() {
        this.detailsAreVisible = !this.detailsAreVisible;
      },
    },
  });

  app.mount('#app');
  ```

#### `Comment:`

1. 可以看出，app.component 用来注册新的 component，有两个参数，第一个是 `component name`, 第二个是 `对应参数`。
2. 对比 `Vue.createApp({...})` 只有一个参数，用来写对应的参数。

---

### <span id="1.3">`Step3: Component Form 2.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 第二种方式的实现是在 vue cli 中生成的 project 中。

  ```diff
  # 定义 FriendContact 并出口
  + <script>{
    export default {

    }
  }</script>

  # 引进
  + import FriendContact from './components/FriendContact';

  # 注册
  + app.component('friend-contact', FriendContact);
  ```

  2. public/index.html

  ```html
  <!DOCTYPE html>
  <html lang="">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
      <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
      <noscript>
        <strong
          >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
          properly without JavaScript enabled. Please enable it to
          continue.</strong
        >
      </noscript>
      <div id="app"></div>
      <!-- built files will be auto injected -->
    </body>
  </html>
  ```

  3. src/App.vue

  ```vue
  <template>
    <section>
      <header><h1>My friends</h1></header>
      <ul>
        <friend-contact
          v-for="friend in friends"
          :friend="friend"
          :key="friend.id"
        ></friend-contact>
      </ul>
    </section>
  </template>

  <script>
  export default {
    data() {
      return {
        friends: [
          { id: '001', name: 'Tom', phone: '12345', email: '123@123.com' },
          { id: '002', name: 'Mary', phone: '222', email: '222@222.com' },
          { id: '003', name: 'Joe', phone: '333', email: '333@333.com' },
        ],
      };
    },
  };
  </script>
  ```

  4. src/components/FriendContact.vue

  ```vue
  <template>
    <li>
      <h2>{{ friend.name }}</h2>
      <button @click="toggleDetails">
        {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
      </button>
      <ul v-if="detailsAreVisible">
        <li><strong>Phone:</strong>{{ friend.phone }}</li>
        <li><strong>Email:</strong>{{ friend.email }}</li>
      </ul>
    </li>
  </template>

  <script>
  export default {
    props: ['friend'],
    data() {
      return {
        detailsAreVisible: false,
      };
    },
    methods: {
      toggleDetails() {
        this.detailsAreVisible = !this.detailsAreVisible;
      },
    },
  };
  </script>
  ```

  5. src/main.js

  ```js
  import { createApp } from 'vue';
  import App from './App.vue';
  import FriendContact from './components/FriendContact';

  const app = createApp(App);
  app.component('friend-contact', FriendContact);
  app.mount('#app');
  ```

#### `Comment:`

1. 可以观察到，在本例中，使用 vue 文件代替方式 1 中的直接定义 component 的方法，关键词是

```diff
+ <template>
+ <script>
+ export default
```

2. 这里的 export default 是在 script 中的，`跟 react 的有所不同。`

### <span id="1.4">`Step4: Component Form 3.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 第三种方式的实现是在 vue cli 中生成的 project 中，component 的注册不是在 main.js 中，而是在 App.js 或者其他 component 之中。

  ```diff
  # 定义
  +
  ```

  2. public/index.html

  ```html
  <!DOCTYPE html>
  <html lang="">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
      <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
      <noscript>
        <strong
          >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
          properly without JavaScript enabled. Please enable it to
          continue.</strong
        >
      </noscript>
      <div id="app"></div>
      <!-- built files will be auto injected -->
    </body>
  </html>
  ```

  3. src/App.vue

  ```vue
  <template>
    <section>
      <header><h1>My friends</h1></header>
      <ul>
        <friend-contact
          v-for="friend in friends"
          :friend="friend"
          :key="friend.id"
        ></friend-contact>
      </ul>
    </section>
  </template>

  <script>
  export default {
    data() {
      return {
        friends: [
          { id: '001', name: 'Tom', phone: '12345', email: '123@123.com' },
          { id: '002', name: 'Mary', phone: '222', email: '222@222.com' },
          { id: '003', name: 'Joe', phone: '333', email: '333@333.com' },
        ],
      };
    },
  };
  </script>
  ```

  4. src/components/FriendContact.vue

  ```vue
  <template>
    <li>
      <h2>{{ friend.name }}</h2>
      <button @click="toggleDetails">Show details</button>
      <ul v-if="detailsAreVisible">
        <li><strong>Phone:</strong>{{ friend.phone }}</li>
        <li><strong>Email:</strong>{{ friend.email }}</li>
      </ul>
    </li>
  </template>

  <script>
  export default {
    props: ['friend'],
    data() {
      return {
        detailsAreVisible: false,
      };
    },
    methods: {
      toggleDetails() {
        this.detailsAreVisible = !this.detailsAreVisible;
      },
    },
  };
  </script>
  ```

  5. src/main.js

  ```js
  import { createApp } from 'vue';
  import App from './App.vue';
  import FriendContact from './components/FriendContact';

  const app = createApp(App);
  app.component('friend-contact', FriendContact);
  app.mount('#app');
  ```

#### `Comment:`

1.

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)
