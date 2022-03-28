# Vue development tools (Part 2)

### `Key Word: event listener / event listener type / event modifier.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Vue Basics)

### `Summary`: In this documentation, we learn Vue.js event listener.

### `Check Dependencies & Tools:`

- ***

#### `本章背景：`

- 本章主要介绍如何用最简单的方式实现 vue + event

- \*\*\*要点

  - event listener 格式 v-on:
  - 常见的 listener type: `keyup / keydown / input / click / submit`
  - method 作为 listener 的时候， `()`可写可不写。

  - keydown 为什么会有延迟效果？
    - keydown 时间触发的时候所读取的 event.target.value `是上一个按键的时候留下的 value`，也就是说 keydown 触发的时候没有更新 event.target.value，也就是不能引用当前按键值。
    - 如果之前没有任何输入，则 keydown 触发时引用的 event.target.value 的值是空字符串，即 "".

  - keyup 为什么没有延迟效果？
    - keyup 时间触发的时候所读取的 event.target.value `是引用当前按键值`，也就是说 keyup 触发的时候 event.target.value 已经完成更新。
    - 但这不是说 keyup 比 keydown 好，因为 keyup 处理不了长按动作。

### <span id="1.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [1.1 Click event listener + methods.](#1.1)
- [1.2 Other click method styles.](#1.2)
- [1.3 Input event listener + methods.](#1.3)
- [1.4 Other input method styles.](#1.4)
- [1.5 Mutiple listeners & modifier.](#1.5)
- [1.6 Submit event listener + methods.](#1.6)
- [1.7 v-once improve performance.](#1.7)

---

### <span id="1.1">`Step1: Click event listener + methods.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. Add click listener

  ```diff
  + v-on:click
  + <button v-on:click="add()">Add 1 - static</button>
  ```

  2. Add methods

  ```js
  const app = Vue.createApp({
    data() {
      return {
        counter: 0,
      };
    },
    methods: {
      add() {
        this.counter = this.counter + 2;
      },
    },
  });

  app.mount('#events');
  ```

  **`Location: ./index.html`**

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
        <h1>Vue Events</h1>
      </header>
      <section id="events">
        <h2>Events in Action</h2>
        <button v-on:click="add()">Add 1 - static</button>
      </section>
    </body>
  </html>
  ```

#### `Comment:`

1. 上面的例子展示一个 method + click listener，同时 method 无参数和调用

### <span id="1.2">`Step2: Other click method styles.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. Add a new method.

  ```diff
  + 带参数的 method
  + method 在 html 中的参数是来自 data
  ```

  2. Add methods

  ```js
  const app = Vue.createApp({
    data() {
      return {
        counter: 0,
        num: 2,
      };
    },
    methods: {
      add() {
        this.counter = this.counter + 2;
      },
      addWithParam(num) {
        this.counter = this.counter + num;
      },
    },
  });

  app.mount('#events');
  ```

  **`Location: ./index.html`**

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
        <h1>Vue Events</h1>
      </header>
      <section id="events">
        <h2>Events in Action</h2>
        <button v-on:click="add">Add 1 - static</button>
        <button v-on:click="addWithParam(num)">Add {{num}} - static</button>
        <p>Counter: {{ counter }}</p>
      </section>
    </body>
  </html>
  ```

#### `Comment:`

1.

### <span id="1.3">`Step3: Input event listener + methods.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. Add a new method.

  ```diff
  + input listener + method
  + method 修改的是 data 里面的变量，然后立刻传回 html
  ```

  2. 简单的 e.target.value 的基本使用

  **`Location: ./app.js`**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        counter: 0,
        num: 2,
      };
    },
    methods: {
      add() {
        this.counter = this.counter + 2;
      },
      addWithParam(num) {
        this.counter = this.counter + num;
      },
      setName(e) {
        this.name = e.target.value;
      },
    },
  });

  app.mount('#events');
  ```

  3. Add method into html file.

  **`Location: ./index.html`**

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
        <h1>Vue Events</h1>
      </header>
      <section id="events">
        <h2>Events Click</h2>
        <button v-on:click="add">Add 1 - static</button>
        <button v-on:click="addWithParam(num)">Add {{num}} - from data</button>
        <p>Counter: {{ counter }}</p>

        <h2>Events Input</h2>
        <input type="text" v-on:input="setName" />
        <p>Your Name: {{name}}</p>
      </section>
    </body>
  </html>
  ```

#### `Comment:`

1.

### <span id="1.4">`Step4: Other input method styles.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. Add a new method.

  ```diff
  + 多参数的 input method
  + <input type="text" v-on:input="setFullname($event, lastName)" />
  ```

  2. input 中有一个参数

  **`Location: ./app.js`**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        counter: 0,
        num: 2,
        lastName: 'Wu',
        name: '',
        fullname: '',
      };
    },
    methods: {
      add() {
        this.counter = this.counter + 2;
      },
      addWithParam(num) {
        this.counter = this.counter + num;
      },
      setName(e) {
        this.name = e.target.value;
      },
      setFullname(e, lastname) {
        this.fullname = e.target.value + ' ' + lastname;
      },
    },
  });

  app.mount('#events');
  ```

  3. Add method into html file.

  **`Location: ./index.html`**

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
        <h1>Vue Events</h1>
      </header>
      <section id="events">
        <h2>Events Click</h2>
        <button v-on:click="add">Add 1 - static</button>
        <button v-on:click="addWithParam(num)">Add {{num}} - from data</button>
        <p>Counter: {{ counter }}</p>

        <h2>Events Input</h2>
        <input type="text" v-on:input="setName" />
        <p>Your Name: {{name}}</p>

        <h2>Events Input with parameter</h2>
        <input type="text" v-on:input="setFullname($event, lastName)" />
        <p>Your Full Name: {{fullname}}</p>
      </section>
    </body>
  </html>
  ```

#### `Comment:`

1.

### <span id="1.5">`Step5: Mutiple listeners & modifier.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 目标

  ```diff
  + 在一个 input 里面放多于 1 个的 listener
  + 在第二个 listener 后面增加 modifier

  + <input type="text" v-on:input="setFullname($event, lastName)" v-on:keyup.enter='confirmInput'/>
  ```

  2. 增加一个 modifier 的 method

  **`Location: ./app.js`**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        counter: 0,
        num: 2,
        lastName: 'Wu',
        name: '',
        fullname: '',
        confirmedName: '',
      };
    },
    methods: {
      add() {
        this.counter = this.counter + 2;
      },
      addWithParam(num) {
        this.counter = this.counter + num;
      },
      setName(e) {
        this.name = e.target.value;
      },
      setFullname(e, lastname) {
        this.fullname = e.target.value + ' ' + lastname;
      },
      confirmInput() {
        this.confirmedName = this.fullname;
      },
    },
  });
  app.mount('#events');
  ```

  3. Add method into html file.

  **`Location: ./index.html`**

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
        <h1>Vue Events</h1>
      </header>
      <section id="events">
        <h2>Events Click</h2>
        <button v-on:click="add">Add 1 - static</button>
        <button v-on:click="addWithParam(num)">Add {{num}} - from data</button>
        <p>Counter: {{ counter }}</p>

        <h2>Events Input</h2>
        <input type="text" v-on:input="setName" />
        <p>Your Name: {{name}}</p>

        <h2>Events Input with parameter</h2>
        <input type="text" v-on:input="setFullname($event, lastName)" />
        <p>Your Full Name: {{fullname}}</p>

        <h2>Events Input with mutiple listeners & modifier</h2>
        <input
          type="text"
          v-on:input="setFullname($event, lastName)"
          v-on:keyup.enter="confirmInput"
        />
        <p>Your confirmedName: {{confirmedName}}</p>
      </section>
    </body>
  </html>
  ```

#### `Comment:`

1.

### <span id="1.6">`Step6: Submit event listener + methods.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 目标

  ```diff
  + 在 form 里面加一个 submit listener
  + 改变 default behavior

  + <form v-on:submit.prevent="submitForm">
  ```

  2. 增加一个 submit listener 的 method

  **`Location: ./app.js`**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        counter: 0,
        num: 2,
        lastName: 'Wu',
        name: '',
        fullname: '',
        confirmedName: '',
      };
    },
    methods: {
      add() {
        this.counter = this.counter + 2;
      },
      addWithParam(num) {
        this.counter = this.counter + num;
      },
      setName(e) {
        this.name = e.target.value;
      },
      setFullname(e, lastname) {
        this.fullname = e.target.value + ' ' + lastname;
      },
      confirmInput() {
        this.confirmedName = this.fullname;
      },
      submitForm() {
        alert('Hello');
      },
    },
  });
  app.mount('#events');
  ```

  3. Add method into html file.

  **`Location: ./index.html`**

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
        <h1>Vue Events</h1>
      </header>
      <section id="events">
        <h2>Events Click</h2>
        <button v-on:click="add">Add 1 - static</button>
        <button v-on:click="addWithParam(num)">Add {{num}} - from data</button>
        <p>Counter: {{ counter }}</p>

        <h2>Events Input</h2>
        <input type="text" v-on:input="setName" />
        <p>Your Name: {{name}}</p>

        <h2>Events Input with parameter</h2>
        <input type="text" v-on:input="setFullname($event, lastName)" />
        <p>Your Full Name: {{fullname}}</p>

        <h2>Events Input with mutiple listeners & modifier</h2>
        <input
          type="text"
          v-on:input="setFullname($event, lastName)"
          v-on:keyup.enter="confirmInput"
        />
        <p>Your confirmedName: {{confirmedName}}</p>

        <h2>Events Submit with modifier</h2>
        <form v-on:submit.prevent="submitForm">
          <button>Click here and the page will not refresh.</button>
        </form>
      </section>
    </body>
  </html>
  ```

#### `Comment:`

1.

### <span id="1.7">`Step7: v-once improve performance.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 目标

  ```diff
  + <p v-once=>Initial Counter: {{ counter }}</p>
  ```

  2. 增加一个 v-once tag

  **`Location: ./index.html`**

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
        <h1>Vue Events</h1>
      </header>
      <section id="events">
        <p v-once=>Initial Counter: {{ counter }}</p>
        <h2>Events Click</h2>
        <button v-on:click="add">Add 1 - static</button>
        <button v-on:click="addWithParam(num)">Add {{num}} - from data</button>
        <p>Counter: {{ counter }}</p>

        <h2>Events Input</h2>
        <input type="text" v-on:input="setName" />
        <p>Your Name: {{name}}</p>

        <h2>Events Input with parameter</h2>
        <input type="text" v-on:input="setFullname($event, lastName)" />
        <p>Your Full Name: {{fullname}}</p>

        <h2>Events Input with mutiple listeners & modifier</h2>
        <input
          type="text"
          v-on:input="setFullname($event, lastName)"
          v-on:keyup.enter="confirmInput"
        />
        <p>Your confirmedName: {{confirmedName}}</p>

        <h2>Events Submit with modifier</h2>
        <form v-on:submit.prevent="submitForm">
          <button>Click here and the page will not refresh.</button>
        </form>
      </section>
    </body>
  </html>
  ```

#### `Comment:`

1.

---

<p align="center">
<img src="../assets/w24.png" width=90%>
</p>

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)
