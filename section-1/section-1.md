# Vue development tools (Part 1)

### `Key Word: basics / passing value / html + vue cdn.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Vue Basics)

### `Summary`: In this documentation, we learn Vue.js basics.

### `Check Dependencies & Tools:`

-

```diff
+
```

---

#### `本章背景：`

- 本章主要介绍如何用最简单的方式实现 vue + html

- \*\*\*要点

  - 向 element 内容传递变量需要加 `{{variable name}}`
  - 向 element attribute 传递变量需要加 `v-bind:<attribute name>="variable name"`
  - 向一个空的 element 传递一个 html tag 变量 `v-html="variable name"`

### <span id="1.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [1.1 HTML + Vue cdn.](#1.1)
- [1.2 Create a Vue instance in a js file and connect it to html file.](#1.2)
- [1.3 Pass the value from js file to html file.](#1.3)
- [1.4 Create methods.](#1.4)
- [1.5 Pass the method data into html file.](#1.5)

---

### <span id="1.1">`Step1: HTML + Vue cdn.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  ```diff
  + Add Vue cdn as a script in html file --- <head>
  - <script src="https://unpkg.com/vue@next" defer></script>
  ```

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
        <h1>Vue Course Goals</h1>
      </header>
      <section></section>
    </body>
  </html>
  ```

#### `Comment:`

1.

### <span id="1.2">`Step2: Create a Vue instance in a js file and connect it to html file.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. Add id into a html element --- <section> part.

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
        <h1>Vue Course Goals</h1>
      </header>
      <section id="user-goal"></section>
    </body>
  </html>
  ```

  2. Create a Vue instance.

  **`Location: ./`**

  ```js
  const app = Vue.createApp({});

  app.mount('#user-goal');
  ```

#### `Comment:`

1.

### <span id="1.3">`Step3: Add data into instance and pass it into html file and render it.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. Add a new function property in instance. Its name is `data`

  **`Location: ./`**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        finalGoal: 'Master Vue',
        vueLink: 'https://vuejs.org/',
        htmlGoal: '<h2>This is a html goal.</h2>',
      };
    },
  });

  app.mount('#user-goal');
  ```

  2. Render `finalGoal` in the html file.

  **`Location: ./`**

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
        <h1>Vue Course Goals</h1>
      </header>
      <section id="user-goal"></section>
      <p>{{finalGoal}}</p>
    </body>
  </html>
  ```

  3. Add `vueLink` as a <a> tag `href` attribute.

  **`Location: ./`**

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
        <h1>Vue Course Goals</h1>
      </header>
      <section id="user-goal"></section>
      <p>{{finalGoal}}</p>
      <p>Learn more <a v-bind:href="vueLink">About Vue</a>.</p>
    </body>
  </html>
  ```

  4. Pass a html element data into html file.

  **`Location: ./`**

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
        <h1>Vue Course Goals</h1>
      </header>
      <section id="user-goal"></section>
      <p>{{finalGoal}}</p>
      <p v-html="htmlGoal"></p>
      <p>Learn more <a v-bind:href="vueLink">About Vue</a>.</p>
    </body>
  </html>
  ```

#### `Comment:`

1. 将变量传递到 content / attribute 是方式不一样的。
2. 传递一个 html element data 比较少用，但方式不一样，使用的是 v-html 关键词。

### <span id="1.4">`Step4: Create methods and pass them into html file.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 添加 methods 属性

  - 主要代码：

  ```js
  const app = Vue.createApp({
    data() {
      return {
        finalGoal: 'Master Vue',
        vueLink: 'https://vuejs.org/',
        htmlGoal: '<h2>This is a html goal.</h2>',
      };
    },
    methods: {
      outputGoalUsingStaticData() {
        const raandomNumber = Math.random();
        if (randomNumber < 0.5) {
          return 'Learn Vue.';
        } else {
          return 'Review Vue.';
        }
      },
    },
  });

  app.mount('#user-goal');
  ```

  2. 添加一个 method，使用 data 里面的数据

  ```js
  const app = Vue.createApp({
    data() {
      return {
        finalGoal: 'Master Vue',
        vueLink: 'https://vuejs.org/',
        htmlGoal: '<h2>This is a html goal.</h2>',
        courseGoal1: 'Finish the course and learn Vue!',
        courseGoal2: 'Finish the course and review Vue!',
      };
    },
    methods: {
      outputGoalUsingStaticData() {
        const randomNumber = Math.random();
        if (randomNumber < 0.5) {
          return 'Learn Vue.';
        } else {
          return 'Review Vue.';
        }
      },
      outputGoalUsingSelfData() {
        const randomNumber = Math.random();
        if (randomNumber < 0.5) {
          return this.courseGoal1;
        } else {
          return this.courseGoal2;
        }
      },
    },
  });

  app.mount('#user-goal');
  ```

#### `Comment:`

1.

### <span id="1.5">`Step5: Pass the method data into html file.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 把 method 的结果显示在 element 的 content 中。

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
        <h1>Vue Course Goals</h1>
      </header>
      <section id="user-goal">
        <h2>My Course Goal</h2>
        <p>{{finalGoal}}</p>
        <p id="html-goal" v-html="htmlGoal"></p>
        <p>{{outputGoalUsingStaticData()}}</p>
        <p>{{outputGoalUsingSelfData()}}</p>
        <p>Learn more <a v-bind:href="vueLink">About Vue</a>.</p>
      </section>
    </body>
  </html>
  ```

  2. 把 method 返回的 data 导进 element 的 attribute 之中。

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
        <h1>Vue Course Goals</h1>
      </header>
      <section id="user-goal">
        <h2>My Course Goal</h2>
        <p>{{finalGoal}}</p>
        <p id="html-goal" v-html="htmlGoal"></p>
        <p>{{outputGoalUsingStaticData()}}</p>
        <p>{{outputGoalUsingSelfData()}}</p>
        <p>Learn more <a v-bind:href="vueLink">About Vue</a>.</p>
        <input v-bind:value="outputGoalUsingSelfData()"/>
      </section>
    </body>
  </html>
  ```

#### `Comment:`

1. method 的返回数据显示规则跟 data 的差不多，在 content 中是使用 {{}}，在 attribute 中使用的是“”。

2. 最大的区别在于 method 需要加 `()` 以表示调用了函数。

---

<p align="center">
<img src="../assets/w24.png" width=90%>
</p>

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)
