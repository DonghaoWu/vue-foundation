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
- [1.4 Create methods and pass them into html file.](#1.4)
- [1.5 Create methods.](#1.5)

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

- 主要代码：

```jsx
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

class App extends Component {
  // ...

  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { robots, searchField, onSearchChange, isPending } = this.props;
    // ...
  }
}

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobotsReducer.searchField,
    robots: state.requestRobotsReducer.robots,
    isPending: state.requestRobotsReducer.isPending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

#### `Comment:`

1. 之前有种写法：

   ```jsx
   export default connect(mapStateToProps, { setSearchField, requestRobots })(
     App
   );
   ```

   - 在这里出现了错误，具体原因后面分析。

2. 连接 component 的几大要素：

   - action functions
   - mapStateToProps
   - mapDispatchToProps
   - connect

### <span id="1.1">`Step1: Create redux async fucntion.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

- 下面具体来分析 `dispatch` 的使用。

- 例子一：dispatch 同步函数的结果 :arrow_right: `object`。

  ```jsx
  // 定义一个同步函数，作为一个 action ，返回一个 object。
  const setSearchField = (text) => ({
    type: CHANGE_SEARCHFIELD,
    payload: text,
  });

  // onSearchChange 是一个函数，它的运作顺序是接收变量，执行 setSearchField 后返回一个 object，最后调用 dispatch 进行派发 object。
  const mapDispatchToProps = (dispatch) => {
    return {
      onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    };
  };

  // 父组件的函数向下传递
  <SearchBox searchChange={this.props.onSearchChange} />;

  // 在这里有点特殊，当用户输入时，onChange 触发，同时 searchChange 触发，同时自动捕捉输入时产生的 event 变量并自动放到 searchChange 中作为变量。
  const SearchBox = ({ searchfield, searchChange }) => {
    return (
      <div className="pa2">
        <input
          className="pa3 ba b--green bg-lightest-blue"
          type="search"
          placeholder="search robots"
          onChange={searchChange}
        />
      </div>
    );
  };
  ```

#### `Comment:`

1. 运行顺序：
   - 用户输入
   - onChange(event)
   - searchChange(event)
   - onSearchChange(event)
   - setSearchField(event.target.value) 获得一个 `object`
   - dispatch({ object })
   - reducer: searchRobotsReducer

- 例子二：dispatch 函数 :arrow_right: 特指异步函数。

  ```jsx
  // 定义一个函数，作为一个 action ，返回一个 function。
  export const requestRobots = () => {
    return fucntion(dispatch){
      dispatch({ type: REQUEST_ROBOTS_PENDING })
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
    }
  }

  // onRequestRobots 返回一个函数，例子一 dispatch 的参数是一个 object，由一个同步函数返回的 object，例子二 dispatch 的参数是一个 function，由一个同步函数返回的 异步函数。
  //这是第一个最大的不同，当返回的是一个 object 时是不用到 thunkMiddleware 的，只有参数是函数的时候，才需要用到这个中间件。
  const mapDispatchToProps = (dispatch) => {
    return {
      onRequestRobots: () => dispatch(requestRobots())
    }
  }

  componentDidMount() {
      this.props.onRequestRobots();
  }
  ```

#### `Comment:`

1. 运行顺序：

   - componentDidMount();
   - onReduestRobots();
   - requestRobots(); 获得一个函数。
   - dispatch 一个函数。相当于：

   ```jsx
   dispatch(function (dispatch) {
     dispatch({ type: REQUEST_ROBOTS_PENDING });
     fetch('https://jsonplaceholder.typicode.com/users')
       .then((data) =>
         dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data })
       )
       .catch((error) =>
         dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error })
       );
   });
   ```

   - 这是一个奇怪的组合。
   - 在 thunkMiddleware 和 dispatch 的共同作用下，结果是运行从 requestRobots 返回的函数，而这个返回的函数也是以 dispatch 作为参数，且在最后使用 `dispatch`去派发 `object`。
   - 之前的疑问是既然 `dispatch` 最后都是一个 object，那么为什么不能使用 `dispatch` 直接对接异步函数返回的 `object`，正如例子一一样操作。这个问题困扰了我很久，这涉及到同步函数跟异步函数的区别，同步函数可以直接得到结果并使用在同步环境中，异步函数是另外开一条线程，可以确定开始时间，但不能确定完成时间，这也是异步情况需要移步函数处理。所以这种情况下，既然不能直接 dispatch 异步函数的结果，就只能运行这个异步函数，等待这个函数完成时在最后 dispatch 这个结果 :arrow_right: `object`。

   - 详细可以参考: [Part6 - Dispatch-Thunk](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/React%2BRedux%2Bwebpack/Dispatch-Thunk.md)

   - `redux-thunk`主要的功能就是可以让我们 dispatch 一个函数，但也保留可以是普通的 `Object`。

### <span id="1.6">`Step6: More materials.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

1. GLOSSARY OF TERMS

   1. Action: an object that has `at least a "type" field`, and any other fields needed to calculate the change to the state

   2. Action Creator: a function that `returns an action`. We write these to help us stay DRY

   3. Action Type: `a string constant` describing something that will cause the UI to update

   4. Middleware: functions that we can use to configure the store. `These add functionality to the store when we dispatch actions.` We don't know how to write our own yet (though it's not hard), so for now we get middleware from various npm packages

   5. Reducer: a function that we write for each app, which accepts `the previous state from the Redux store as its first argument, and an action as its second argument.` It should return a new state object with the changes described by the action. The reducer should be a pure function - `there should be no side effects, and it should not mutate the previous state.`

   6. Store: an object created by the "createStore" function from Redux. It accepts a reducer that we write, and any number of optional middleware. `It maintains a "state" object internally, which we have access to via "store.getState". When we pass an action to "store.dispatch", the store swaps out its current state with the result of invoking the reducer with the action and the current state. We can also register listeners via "store.subscribe", which the store will invoke after the state has changed.`

---

<p align="center">
<img src="../assets/w24.png" width=90%>
</p>

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)
