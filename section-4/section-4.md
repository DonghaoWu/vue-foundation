# Vue development tools (Part 4)

### `Key Word: Dynamic styling.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Vue Basics)

### `Summary`: In this documentation, we learn Vue.js with dynamic styling.

### `Check Dependencies & Tools:`

- null

#### `本章背景：`

- 本章主要介绍如何使用 Vue Dynamic styling.

- **要点**

  - 本部分主要是作为参考使用，讲述多种的 Vue dynamic styling 的用法
  - 这里面已经涵盖了大部分的用法，涉及 CSS 的都可以从这里参考。

### <span id="1.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [1.1 6 ways in Vue dynamic styling.](#1.1)

---

### <span id="1.1">`Step1: 6 ways in Vue dynamic styling.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 6 种方法

  ```diff
  + 直接 inline styling,
  + :style="<JS object>"
  - :style="{
  -   borderColor: boxASelected ? 'red' : '#ccc',
  -   backgroundColor: boxASelected ? 'salmon' : '#FFF'
  - }"

  + 使用 v-bind + JS code,
  + :class="JS code"
  - :class="boxBSelected ? 'demo active' : 'demo'"

  + 使用 `固定 + 动态` 方式，
  + class="className" :class="Js boolean object"
  - class="demo" :class="{active: boxDSelected}"

  + 使用 object + className + boolean,
  + :class="JS boolean object"
  - :class="{demo: true, active: boxCSelected}"

  + 使用 array + boolean object
  + :class=['className', <JS boolean object>]
  - :class="['demo', {active: boxFSelected}]"

  + 使用 computed
  + :class="computedFunctionName"

  - :class="boxEClasses"
  - boxEClasses() {
  -   return { active: this.boxESelected };
  - }
  ```

  2. 代码

  - **`Location: ./index.html`**

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
        <h1>Vue Dynamic Styling</h1>
      </header>
      <section id="styling">
        <div
          class="demo"
          :style="{
          borderColor: boxASelected ? 'red' : '#ccc',
          backgroundColor: boxASelected ? 'salmon' : '#FFF'
        }"
          @click="boxSelected('A')"
        ></div>
        <div
          :class="boxBSelected ? 'demo active' : 'demo'"
          @click="boxSelected('B')"
        ></div>
        <div
          :class="{demo: true, active: boxCSelected}"
          @click="boxSelected('C')"
        ></div>
        <div
          class="demo"
          :class="{active: boxDSelected}"
          @click="boxSelected('D')"
        ></div>
        <div class="demo" :class="boxEClasses" @click="boxSelected('E')"></div>
        <div
          :class="['demo', {active: boxFSelected}]"
          @click="boxSelected('F')"
        ></div>
      </section>
    </body>
  </html>
  ```

  - **`Location: ./app.js`**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        boxASelected: false,
        boxBSelected: false,
        boxCSelected: false,
        boxDSelected: false,
        boxESelected: false,
        boxFSelected: false,
      };
    },
    computed: {
      boxEClasses() {
        return { active: this.boxESelected };
      },
    },
    methods: {
      boxSelected(box) {
        if (box === 'A') this.boxASelected = !this.boxASelected;
        else if (box === 'B') this.boxBSelected = !this.boxBSelected;
        else if (box === 'C') this.boxCSelected = !this.boxCSelected;
        else if (box === 'D') this.boxDSelected = !this.boxDSelected;
        else if (box === 'E') this.boxESelected = !this.boxESelected;
        else this.boxFSelected = !this.boxFSelected;
      },
    },
  });
  app.mount('#styling');
  ```

  - **`Location: ./styles.css`**

  ```css
  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Jost', sans-serif;
  }

  body {
    margin: 0;
  }

  header {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 3rem;
    border-radius: 10px;
    padding: 1rem;
    background-color: #4fc08d;
    color: white;
    text-align: center;
  }

  #styling {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 3rem;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
  }

  .demo {
    width: calc(100% - 32px);
    height: 100px;
    margin: 16px;
    border: 2px dashed #ccc;
  }

  .active {
    border-color: red;
    background-color: salmon;
  }
  ```

#### `Comment:`

1.

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

```

```
