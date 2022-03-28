1. 这是 Vue section 2 的部分，依然是基础的部分。

2. 接下来讲的是数据绑定

3. 如果通过 method 改变 data 里面的变量

4. 具体语句

```html
<section id="events">
  <h2>Events in Action</h2>
  <button v-on:click="counter++">Add</button>
  <button v-on:click="counter--">Remove</button>
  <p>Result: {{ counter }}</p>
</section>
```

5. 打包成一个 method

```html
<button v-on:click="add()">Add</button>
<button v-on:click="subtract()">Remove</button>
```

- 不同的是，所有的 method 出现在 html 中的时候可以带也可以不带 ().

6. 创建带参数的 method

```js
const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      num: 2,
    };
  },
  methods: {
    add(num) {
      this.counter = this.counter + num;
    },
    subtract() {
      this.counter = this.counter - this.num;
    },
  },
});

app.mount('#events');
```

7. event listener click/ 在 v-on 中调用函数 / 调用函数并以 data 变量为参数

```html
<button v-on:click="add(1)">Add 1 - static</button>
<button v-on:click="add(num)">
  Add {{num}} - method with parameter from data.
</button>
<button v-on:click="subtract()">Remove {{num}} - method</button>
```

8. event listener input / v-on:input="" /

- `默认参数 event 与 第二参数的表现形式。`

```html
<input type="text" v-on:input="setName" />
<input type="text" v-on:input="setName2($event, 'wu')" />
<p>Your name: {{ name }}</p>
```

```js
const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      num: 2,
      name: '',
    };
  },
  methods: {
    add(num) {
      this.counter = this.counter + num;
    },
    subtract() {
      this.counter = this.counter - this.num;
    },
    setName(event) {
      this.name = event.target.value;
    },
    setName2(event, lastName) {
      this.name = event.target.value;
    },
  },
});

app.mount('#events');
```

9. event modifier

```html
<form v-on:submit="submitForm">
  <input type="text" />
  <button>Sign Up</button>
</form>

<form v-on:submit.prevent="submitForm">
  <input type="text" />
  <button>Sign Up</button>
</form>

<input
  type="text"
  v-on:input="setName($event, 'wu')"
  v-on:keyup.enter="confirmedInput"
/>
```

- 改变 event default 的行为

```js
const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      num: 2,
      name: '',
      confirmedName: '',
    };
  },
  methods: {
    add(num) {
      this.counter = this.counter + num;
    },
    subtract() {
      this.counter = this.counter - this.num;
    },
    setName(event) {
      this.name = event.target.value;
    },
    setName2(event, lastName) {
      this.name = event.target.value;
    },
    submitForm(event) {
      event.preventDefault();
      alert('form submitted.');
    },
    confirmedInput() {
      this.confirmedname = this.name;
    },
  },
});

app.mount('#events');
```

- 重点

```html
<form v-on:submit.prevent="submitForm">
  <input type="text" />
  <button>Sign Up</button>
</form>

<input
  type="text"
  v-on:input="setName($event, 'wu')"
  v-on:keyup.enter="confirmedInput"
/>

<!-- 只更新一次 -->
<p v-once>Starging Counter: {{ counter }}</p>
```

- method 除了可以对 data 取值，还可以对 data 赋值

1. 增加 event listener

2. v-on 主要用于 eventlistener

3. 如何添加一个 event listener，并创建一个 method 连接这个 listener

4. event listener + method 在 attribute 里面是怎样表达的

5. method 需要增加 （）吗

6. method 里面怎样使用 data 里面的参数，method 在 attribute 里面是如何调用参数的，如果 data 作为 method 的自有参数应该怎样写，如果 data 作为 method
   的 attribute 参数又应该怎样写？

7. 讲完 click event 之后，再讲 input event

8. 在 input event 中 event 参数是默认的，如果参数是多于 1 个的，那么需要这样写

```html
<input type="text" v-on:input="setFullname($event, lastName)" />
```

9. Vue 跟 react 的一个区别是有时候在 vue 里面分不清哪个是变量，哪个是字符串，当然也有方法区分，比如说

```html
<input type="text" v-on:input="setFullname($event, 'lastName')" />
<input type="text" v-on:input="setFullname($event, lastName)" />
```

- 以上第一个 lastName 是字符串，第二个是变量。

10. 现在来到 event modifier

11. 讲完了 click 和 input 接下来讲的是 submit event

12. v-on:submit.prevent='submitForm'

```html
<form v-on:submit.prevent="submitForm"></form>
```

13. 同时还有

```html
<button v-on:click.right="subtract()">Remove {{num}} - method</button>

<input
  type="text"
  v-on:input="setFullname($event, lastName)"
  v-on:keyup.enter="confirmedInput"
/>
```

14. 另外一个 modifier once，the specific data should 本 evaluated one time.

```html
<p v-once>Starting Counter {{counter}}</p>
```

15. 接下来是 assignment 的操作

16. keyup 跟 keydown event 有什么不一样

17. 为什么 keydown 会慢拍？keyup 是准拍的？

18. keyup / keydown / input 三个 listener 有什么不一样

19. 
