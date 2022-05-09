# Vue development tools (Part 10)

### `Key Word: component communication practice.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Vue Basics)

### `Summary`: In this documentation, we practice some advanced vue component features.

### `Check Dependencies & Tools:`

- null

#### `本章背景：`

- 本章主要介绍一些常用的高阶 vue component 的用法。

- **要点**

  ```diff
  + Local component registration
  + scoped styling
  + slot
  + mutiple slots
  + slot fall back
  + slot improvement
  + slot shorthand
  + scoped slots
  + slot props
  + dynammic component
  + keep dynamic component alive
  + customize error slot
  + teloproting
  + Fragements
  ```

### <span id="1.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [1.1 Local component registration & scoped styling.](#1.1)
- [1.2 slot basic.](#1.2)
- [1.3 Validating Props.](#1.3)
- [1.4 Emitting Custom Events.](#1.4)
- [1.5 Add delete functionalities.](#1.5)

---

### <span id="1.1">`Step1: Local component registration & scoped styling.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 创建

  - src/components/NewFriend.vue

    ```html
    <template>
      <div>
        <the-header></the-header>
      </div>
    </template>

    <script>
    import TheHeader from './components/TheHeader.vue';
    import BadgeList from './components/BadgeList.vue';
    import UserInfo from './components/UserInfo.vue';
    import CourseGoalsSlot from './components/CourseGoalsSlot.vue';

    export default {
      components: {
        TheHeader,
        BadgeList,
        UserInfo,
      },
    ```

  2. 注册

  - src/main.js

    ```js
    import NewFriend from './components/NewFriend.vue';

    app.component('new-friend', NewFriend);
    ```

  3. 应用

  - src/App.vue

    ```html
    <template>
      <section>
        <header>
          <h1>My Friends</h1>
        </header>
        <new-friend></new-friend>
        <ul>
          <friend-contact></friend-contact>
        </ul>
      </section>
    </template>
    ```

---

### <span id="1.2">`Step2: Add two ways data binding.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. set up data and input binding

  - src/components/NewFriend.vue

  ```html
  <template>
    <form>
      <div>
        <label>Name</label>
        <input type="text" v-model="enteredName" />
      </div>
      <div>
        <label>Phone</label>
        <input type="tel" v-model="enteredPhone" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" v-model="enteredEmail" />
      </div>
      <div>
        <button>Add Contact</button>
      </div>
    </form>
  </template>

  <script>
    export default {
      data() {
        return {
          enteredName: '',
          enteredPhone: '',
          enteredEmail: '',
        };
      },
    };
  </script>
  ```

#### `Comment:`

1.

---

### <span id="1.3">`Step3: Create custom event and pass it down to child component.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 父组件创建 method 并向下传递.

  - src/components/App.vue

  ```html
  <template>
    <new-friend @add-contact="addContact"></new-friend>
  </template>

  <script>
    export default {
      methods: {
        addContact({ inputName, inputPhoneNumber, inputEmail }) {
          const newFriendContact = {
            id: new Date().toISOString(),
            name: inputName,
            phone: inputPhoneNumber,
            email: inputEmail,
            isFavorite: false,
          };
          this.friends.push(newFriendContact);
        },
      },
    };
  </script>
  ```

#### `Comment:`

1.

### <span id="1.4">`Step4: Get the method and apply in Child component.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. Emit the custom event in Child component.

  ```html
  <template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Name</label>
        <input type="text" v-model="enteredName" />
      </div>
      <div>
        <label>Phone</label>
        <input type="tel" v-model="enteredPhone" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" v-model="enteredEmail" />
      </div>
      <div>
        <button>Add Contact</button>
      </div>
    </form>
  </template>

  <script>
    export default {
      emits: ['add-contact'],
      data() {
        return {
          enteredName: '',
          enteredPhone: '',
          enteredEmail: '',
        };
      },
      methods: {
        handleSubmit() {
          this.$emit('add-contact', {
            inputName: this.enteredName,
            inputPhoneNumber: this.enteredPhone,
            inputEmail: this.enteredEmail,
          });
        },
      },
    };
  </script>
  ```

#### `Comment:`

1. 重点语句

   ```diff
   + emits: ['add-contact'],

   + methods: {
       handleSubmit() {
         this.$emit('add-contact', {
           inputName: this.enteredName,
           inputPhoneNumber: this.enteredPhone,
           inputEmail: this.enteredEmail,
         });
       },
   + },

   + <form @submit.prevent="handleSumbit">
   ```

### <span id="1.5">`Step5: Add delete functionalities.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. ##### Parent

  - src/App.vue

  ```html
  <template>
    <section>
      <header>
        <h1>My Friends</h1>
      </header>
      <new-friend @add-contact="addContact"></new-friend>
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
          @delete-contact="deleteContact"
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
        addContact({ inputName, inputPhoneNumber, inputEmail }) {
          const newFriendContact = {
            id: new Date().toISOString(),
            name: inputName,
            phone: inputPhoneNumber,
            email: inputEmail,
            isFavorite: false,
          };
          this.friends.push(newFriendContact);
        },
        deleteContact(friendId) {
          this.friends = this.friends.filter(
            (friend) => friend.id !== friendId
          );
        },
      },
    };
  </script>
  ```

  2. ##### Child

  - src/components/FriendContact.vue

  ```html
  <template>
    <li>
      <h2>{{ name }} {{ isFavorite ? '- (Favorite)' : '' }}</h2>
      <button @click="toggleDetails(id)">
        {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
      </button>
      <button @click="toggleFavorite">Toggle Favorite</button>
      <ul v-if="detailsAreVisible">
        <li><strong>Phone:</strong>{{ phoneNumber }}</li>
        <li><strong>Email:</strong>{{ emailAddress }}</li>
      </ul>
      <button v-on:click="deleteContact">Delete</button>
    </li>
  </template>

  <script>
    export default {
      emits: ['toggle-favorite', 'delete-contact'],
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
        toggleFavorite() {
          this.$emit('toggle-favorite', this.id);
        },
        deleteContact() {
          this.$emit('delete-contact', this.id);
        },
      },
    };
  </script>
  ```

#### `Comment:`

1. 重点语句

   ```diff
   - Parent
   + methods: {
       deleteContact(friendId) {
         this.friends = this.friends.filter((friend) => friend.id !== friendId);
       },
   + },

   + <friend-contact @delete-contact="deleteContact"></friend-contact>


   - Child
   + emits: ['delete-contact'],

   + methods: {
       deleteContact() {
         this.$emit('delete-contact', this.id);
       },
   + },

   + <button v-on:click="deleteContact">Delete</button>
   ```

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)
