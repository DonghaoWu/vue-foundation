# Vue development tools (Part 8)

### `Key Word: props / custom events between components.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Vue Basics)

### `Summary`: In this documentation, we learn the communications between components.

### `Check Dependencies & Tools:`

- null

#### `本章背景：`

- 本章使用的是 section-7 里面的第三种组织方式
- 本章为重点章，主要介绍传递 data 和 method。

- **要点**

  - 引用 component

  - v-bind 的多个作用

    ```diff
    + 向 tag 中的 regular attribute 传递 JS 变量 / JS 运算式
    + 向 tag 中的 custom attribute data 向下 component 传递 JS 变量 / JS 运算式，这种情况下需要记得在 child 中添加 props 去承接。

    + 在 tag 中使用 JS 规则内的代码
    ```

  - 关于 custom attribute data 的承接

    ```diff
    - custome attribute data
    + 需要在 Child 中使用 props 去承接
    + <friend-contact v-bind:name="friend.name"></friend-contact>
    ```

  - data / custom event 的传递过程中的命名

    ```diff
    + parent => phone-number | child => phoneNumber
    ```

  - Vue 不允许在 child 中修改承接下来的 data，一般这种情况是通过 custom event 对 parent 数据进行修改的。不过特殊情况下可以把数据放在本地 data 之后进行修改，`但这种修改是不会影响 parent 中对应的 data 的。`
    <br/>

    ```js
    <script>
    export default {
      props: ['isFavorite'],
      data() {
        return {
          friendIsFavorite: this.isFavorite
        };
      },
      methods: {
        toggleFavorite(){
          this.friendIsFavorite = !this.friendIsFavorite
        }
      },
    };
    </script>
    ```

  - 传递 props 的规则

    ```diff
    # 传递 (App.vue)
    + <friend-contact
        v-for="friend in friends"
        v-bind:key="friend.id"
        :id="friend.id"
        :name="friend.name"
        :phone-number="friend.phone"
        :email-address="friend.email"
        :is-favorite="friend.isFavorite"
    + ></friend-contact>

    # 承接 (FriendContact.vue)
    + props: ['name', 'phoneNumber', 'emailAddress', 'isFavorite']

    # 应用
    + <li><strong>Phone:</strong>{{ phoneNumber }}</li>
    + <li><strong>Email:</strong>{{ emailAddress }}</li>
    ```

  - 传递 event 的规则

    ```js
    // 1. 父组件定义 method (App.vue)
    methods: {
        toggleFavorite(friendId) {
          const identifiedFriend = this.friends.find(
            (friend) => friend.id === friendId
          );
          identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
        },
    },

    // 2. 在 template 中传递 (App.vue)

    // <friend-contact v-for="friend in friends" v-on:toggle-favorite="toggleFavorite"></friend-contact>

    // 3. 在 child 中承接 (FriendContact.vue) - 可暂不加，Vue3 特征
    emits: ['toggle-favorite']
    // 或者这样写:
    emits: {
        'toggle-favorite': function (id) {
          if (id) {
            return true;
          } else {
            console.warn('Id is missing.');
            return false;
          }
        },
    },

    // 4. 在 child 中再定义
    methods: {
        toggleFavorite() {
          this.$emit('toggle-favorite', this.id);
        },
    },

    // 5. child 中应用
    <button @click="toggleFavorite">Toggle Favorite</button>
    ```

### <span id="1.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [1.1 Basic sturcture.](#1.1)
- [1.2 Pass data from Parent component to Child.](#1.2)
- [1.3 Validating Props.](#1.3)
- [1.4 Emitting Custom Events.](#1.4)

---

### <span id="1.1">`Step1: Basic sturcture.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

1. 重点

   ```diff
   # 定义 FriendContact 并出口
   + <script>{
       export default {

       }
   + }</script>

   # 引进
   + import FriendContact from './components/FriendContact';

   # 注册
   + app.component('friend-contact', FriendContact);

   # 使用
   + <friend-contact></friend-contact>
   ```

2. src/main.js

   ```js
   import { createApp } from 'vue';
   import App from './App.vue';
   import FriendContact from './components/FriendContact';

   const app = createApp(App);
   app.component('friend-contact', FriendContact);
   app.mount('#app');
   ```

3. src/App.vue

   ```html
   <template>
     <section>
       <header>
         <h1>My Friends</h1>
       </header>
       <ul>
         <friend-contact></friend-contact>
       </ul>
     </section>
   </template>

   <script>
     export default {
       data() {
         return {
           friends: [
             {
               id: 'manuel',
               name: 'Manuel Lorenz',
               phone: '0123 45678 90',
               email: 'manuel@localhost.com',
               isFavorite: true,
             },
             {
               id: 'julie',
               name: 'Julie Jones',
               phone: '0987 654421 21',
               email: 'julie@localhost.com',
               isFavorite: false,
             },
           ],
         };
       },
     };
   </script>
   ```

4. src/components/FriendContact.vue

   ```html
   <template>
     <li>
       <h2>{{ name }}</h2>
       <button @click="toggleDetails">
         {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
       </button>
       <ul v-if="detailsAreVisible">
         <li><strong>Phone:</strong>{{ phone }}</li>
         <li><strong>Email:</strong>{{ email }}</li>
       </ul>
     </li>
   </template>

   <script>
     export default {
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

---

### <span id="1.2">`Step2: Pass data from Parent component to Child.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 主要规则

  ```diff
  # 传递 (App.vue)
  + <friend-contact
      v-for="friend in friends"
      v-bind:key="friend.id"
      :id="friend.id"
      :name="friend.name"
      :phone-number="friend.phone"
      :email-address="friend.email"
      :is-favorite="friend.isFavorite"
  + ></friend-contact>

  # 承接 (FriendContact.vue)
  + props: ['name', 'phoneNumber', 'emailAddress', 'isFavorite']

  # 应用
  + <li><strong>Phone:</strong>{{ phoneNumber }}</li>
  + <li><strong>Email:</strong>{{ emailAddress }}</li>
  ```

  2. src/App.vue

  ```html
  <template>
    <section>
      <header>
        <h1>My Friends</h1>
      </header>
      <ul>
        <friend-contact
          v-for="friend in friends"
          :key="friend.id"
          :id="friend.id"
          :name="friend.name"
          :phone-number="friend.phone"
          :email-address="friend.email"
          :is-favorite="friend.isFavorite"
        ></friend-contact>
      </ul>
    </section>
  </template>

  <script>
    export default {
      data() {
        return {
          friends: [
            {
              id: 'manuel',
              name: 'Manuel Lorenz',
              phone: '0123 45678 90',
              email: 'manuel@localhost.com',
              isFavorite: true,
            },
            {
              id: 'julie',
              name: 'Julie Jones',
              phone: '0987 654421 21',
              email: 'julie@localhost.com',
              isFavorite: false,
            },
          ],
        };
      },
    };
  </script>
  ```

3. src/components/FriendContact.vue

   ```html
   <template>
     <li>
       <h2>{{ name }} {{ isFavorite ? '- (Favorite)' : '' }}</h2>
       <button @click="toggleDetails">
         {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
       </button>
       <ul v-if="detailsAreVisible">
         <li><strong>Phone:</strong>{{ phoneNumber }}</li>
         <li><strong>Email:</strong>{{ emailAddress }}</li>
       </ul>
     </li>
   </template>

   <script>
     export default {
       props: ['name', 'phoneNumber', 'emailAddress', 'isFavorite'],
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

#### `Comment:`

1. 向 child component 传递固定参数，如

   ```html
   <friend-contact
     name="Tom"
     phone-number="123456"
     email-address="1@1.com"
     :isFavorite="true"
   >
   </friend-contact>
   ```

- 这种情况是不需要加 ':' 的，除了最后一个因为 true 是 JS 规则里面的产物，所以要加 ':' 然后 '=' 右边才可以使用 JS code

- `除此之外，这种情况在 child 中也还需要使用 props 去承接 custom attribute data。`

2. 这里提到传输参数也是用 v-bind，那么之前的 v-bind 跟现在这个 v-bind 有什么区别呢？

   ```diff
   - custome attribute
   - 需要在 Child 中使用 props 去承接
   + <friend-contact v-bind:name="friend.name"></friend-contact>

   - regular attribute
   + <a v-bind:href="vueLink">About Vue</a>
   ```

3. 另外，传输 props 的命名规则是

   ```diff
   - parent => phone-number | child => phoneNumber

   + <friend-contact v-bind:phone-number="friend.phone-number"></friend-contact>

   + props: ['phoneNumber'],
   + <li><strong>Phone:</strong>{{ phoneNumber }}</li>
   ```

---

### <span id="1.3">`Step3: Validating Props.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. src/components/FriendContact.vue

  ```html
  <template>
    <li>
      <h2>{{ name }} {{ isFavorite ? '- (Favorite)' : '' }}</h2>
      <button @click="toggleDetails">
        {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
      </button>
      <ul v-if="detailsAreVisible">
        <li><strong>Phone:</strong>{{ phoneNumber }}</li>
        <li><strong>Email:</strong>{{ emailAddress }}</li>
      </ul>
    </li>
  </template>

  <template>
    <li>
      <h2>{{ name }} {{ isFavorite ? '- (Favorite)' : '' }}</h2>
      <button @click="toggleDetails">
        {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
      </button>
      <ul v-if="detailsAreVisible">
        <li><strong>Phone:</strong>{{ phoneNumber }}</li>
        <li><strong>Email:</strong>{{ emailAddress }}</li>
      </ul>
    </li>
  </template>

  <script>
    export default {
      // props: ['name', 'phoneNumber', 'emailAddress', 'isFavorite'],
      props: {
        name: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        emailAddress: {
          type: String,
          required: true,
        },
        isFavorite: {
          type: Boolean,
          required: true,
          default: false,
          validator: function (value) {
            return value === true || value === false;
          },
        },
      },
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

#### `Comment:`

1.

### <span id="1.4">`Step4: Emitting Custom Events.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 主要规则

  ```js
  // 1. 父组件定义 method (App.vue)
  methods: {
      toggleFavorite(friendId) {
        const identifiedFriend = this.friends.find(
          (friend) => friend.id === friendId
        );
        identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
      },
  },

  // 2. 在 template 中传递 (App.vue)

  // <friend-contact v-for="friend in friends" v-on:toggle-favorite="toggleFavorite"></friend-contact>

  // 3. 在 child 中承接 (FriendContact.vue) - 可暂不加，Vue3 特征
  emits: ['toggle-favorite']
  // 或者这样写:
  emits: {
      'toggle-favorite': function (id) {
        if (id) {
          return true;
        } else {
          console.warn('Id is missing.');
          return false;
        }
      },
  },

  // 4. 在 child 中再定义
  methods: {
      toggleFavorite() {
        this.$emit('toggle-favorite', this.id);
      },
  },

  // 5. child 中应用
  <button @click="toggleFavorite">Toggle Favorite</button>
  ```

  2. src/App.vue

  ```html
  <template>
    <section>
      <header>
        <h1>My Friends</h1>
      </header>
      <ul>
        <friend-contact
          v-for="friend in friends"
          :key="friend.id"
          :id="friend.id"
          :name="friend.name"
          :phone-number="friend.phone"
          :email-address="friend.email"
          :is-favorite="friend.isFavorite"
          v-on:toggle-favorite="toggleFavorite"
        ></friend-contact>
      </ul>
    </section>
  </template>

  <script>
    export default {
      data() {
        return {
          friends: [
            {
              id: '001',
              name: 'Manuel Lorenz',
              phone: '0123 45678 90',
              email: 'manuel@localhost.com',
              isFavorite: true,
            },
            {
              id: '002',
              name: 'Julie Jones',
              phone: '0987 654421 21',
              email: 'julie@localhost.com',
              isFavorite: false,
            },
          ],
        };
      },
      methods: {
        toggleFavorite(friendId) {
          const identifiedFriend = this.friends.find(
            (friend) => friend.id === friendId
          );
          identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
        },
      },
    };
  </script>
  ```

  3. src/components/FriendContact.vue

  ```html
  <template>
    <li>
      <h2>{{ name }} {{ isFavorite ? '- (Favorite)' : '' }}</h2>
      <button @click="toggleDetails(id)">
        {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
      </button>
      <button @click="toggleFavorite(id)">Toggle Favorite</button>
      <ul v-if="detailsAreVisible">
        <li><strong>Phone:</strong>{{ phoneNumber }}</li>
        <li><strong>Email:</strong>{{ emailAddress }}</li>
      </ul>
    </li>
  </template>

  <script>
    export default {
      props: {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        emailAddress: {
          type: String,
          required: true,
        },
        isFavorite: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      data() {
        return {
          detailsAreVisible: false,
        };
      },
      methods: {
        toggleDetails() {
          this.detailsAreVisible = !this.detailsAreVisible;
        },
        toggleFavorite(friendId) {
          this.$emit('toggle-favorite', friendId);
        },
      },
    };
  </script>
  ```

#### `Comment:`

1.

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)
