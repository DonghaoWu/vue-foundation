1. left approach

2. vue alternatives

3. component-based UI framework

4. Can bbe overkil for smsaller projects

5. switching is not too hard.

6. dummy project

7. build a application from scrath by using

```js
// interative implement
const buttonEl = document.querySelector('button');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('ul');

function addGoal(){
  const enteredValue = inputEl.value;
  const listItemEl = document.createElement('li');
  listItemEl.textContent = enteredValue;
  listEl.appendChild(listItemEl);
  inputEl.value = '';
}

buttonEl.addEventListener('click', addGoal)
```

8. introduce Vue

- add a script into html file

```html
<script src="https://unpkg.com/vue@next"></script>
<script src="app.js"></script>
```

```js
Vue.createApp({
  data: function(){

  }
})

// 一个 obj key 为 data 同时内容为 function 可以这样写
Vue.createApp({
  data(){
    return {
      goals:[],
      enteredValue:''
    };
  },
  methods:{
    addGoal(){
      this.goals.push(this.enteredValue)
      this.enteredValue = ''
    }
  }
}).mount('#app')
```

```html
<div id="app">
  <input type="text" id="goal" v-model="enteredValue">

  <button v-on:click="addGoal">Add Goal</button>

  <ul>
    <li v-for="goal in goals">{{ goal }}</li>
  </ul>

</div>
```

9. environment setting

```diff
+ Pretter
```

10. Re-using Code, practice on your own

11. code along

12. repeat concept

13. Basics & Core Concepts - DOM Interaction with Vue

```diff
+ Module content
+ 
```

14. 今天主要学习了几个方面的内容

```diff
+ 从基础的地方开始学习 Vue
+ 如何在 html 中引入和使用 Vue，可不可以直接使用 Vue？
+ Vue 是通过哪种方式引入到 Html 的

+ 需要通过哪几个步骤才可以把 app.js 中的 Vue 的数据输入到 html 中？
+ 什么是数据绑定，是如何做到的。用哪种格式把 app 中的数据在 html 中显示出来
+ 最简单的显示数据或者快速调试的方法 {{}}
+ 如何在 tag 中引入变量 {{}}
+ 如何在 attribute 中引入变量 v-bind: / :
+ 如何引入 methods？
+ 如何把 methods 返回的变量显示在 element 中。
+ 如何在 method 中引用 app instance 中的 data？
+ 如何把 html element 作为 data 放进 data 并传到 app 中？
```