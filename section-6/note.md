1. 在 method 中 call data 或者 call method 都要添加 this

2. method 在 tag 中引用时 括号可加可不加

3. 两种写法

```html
<div class="healthbar__value" :style="{width: `${monsterHealth}%`}"></div>

<div class="healthbar__value" :style="{width: monsterHealth + '%'}"></div>
```

4. computed 的 function 里面能不能有参数？好像 computed 是使用自己的 data，而不需要增加参数。

5. 纠正一个认识就是在 tag content 中的 {{}} 里面不止可以写变量，更多的是写 JS code，只不过写 data 里面的变量的时候不需要使用 this 就能自动辨识

6. 同样道理，在 tag attribute 中的 v-bind 后面的双引号里面可以写任何 JS code

7. 容易混淆的是在 :style 和 :class 后面双引号后添加的是一个 js 里面的 object，这里牵涉的是另外一个规则，但可以确定的是 object 里面都是 JS code

---

### Section 5 Vue behind the scenes

1. Vue is reactive

2. 使用 proxy + setter + getter 来说明 Vue 的原理。

```js
const data = {
  message: 'hello',
};

const handler = {
  set(target, key, value) {
    if (key === 'message') {
      target.longMessage = value + ' World';
    }
    target[key] = value;
  },
};

const proxy = new Proxy(data, handler);

proxy.message = 'Hello!!!!!';
```

3. multiple apps

4. templates

```js
const app = Vue.createApp({
  template: `<p> {{message}} </p>`,
  data() {
    return {
      message: 'hello',
    };
  },
});
```

5. Working with Refs

```html
<input type="text" ref="userText" />
```

```js
setText(){
  console.dir(this.$refs.userText)
  this.message = this.$refs.userText.value;
}
```

6. How Vue updates the DOM, virturl DOM

7. Vue lifecycle

```diff
+ beforeCreate()
+ created()
+ beforeMount()
+ mounted()
+ beforeUpdate()
+ updated()
+ beoreUnmounted()
+ unmounted()
```

- 在 chrome 的 inspect 的 sources tag 中加入 breakpoint，就可以观察多个 breakpoint 之间的执行先后顺序，这个是一直想要学的调试工具。

8. 
