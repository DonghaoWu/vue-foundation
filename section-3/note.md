1. v-on

2. reset the input

3.

```html
<input type="text" v-bind:value="name" v-on:input="setname" />
<button v-on:click="resetName">Reset name</button>
```

```js
return{
  name:''
}

setname(event, lastName){
  this.name = event.target.value
}

resetName(){
  this.name = ''
}
```

4. shortcut

```html
<input type="text" v-model="name" />
<button v-on:click="resetName">Reset name</button>
```

```js
return{
  name:''
}

resetName(){
  this.name = ''
}
```

5. v-bind / v-on / v-model

6. 如果在 html 中引入

```html
<p>Your name:{{ outputName() }}</p>
```

```js
methods:{
  outputName(){
    if(this.name === ''){
      return ''
    }
    return this.name + ' ' + 'Wu'
  }
}
```

- 这里面有一个问题，就是 performance 的问题，就是每当 data 里面的其他数据发生变化时，就算不是 name，也会执行一次 outputName
- method is not the best solution to output the dynamic content, it is better to handle some event listener and not invoke frequently.

7. computed properties

```js
computed:{
  fullname(){
    return this.name + ' ' + 'Wu'
  }
}
```

```html
<p>Your name {{ fullname }}</p>
```

8. it is better to use computed than methods for outputing values.

9. working with watchers

```js
data(){
  return{
    counter:0,
    name:'',
    lastName:'',
    fullname:''
  }
},
watch:{
  name(value){
    this.fullname = value + ' ' + this.lastName
  },
  lastName(value){
    this.fullname = this.name + ' ' + value
  }
},
computed:{
  outputFullname(){
    return this.name + ' ' + this.lastName
  }
}
```

- watch 上每一个 method 的名字必须在 data 中有所对应。

- 从上面的例子可以看出 watch 只能监测 1 个变量，但是 computed 可以检测多于 1 个变量

- 那么 watch 使用在哪个场景呢？

```js
watch:{
  conuter(value){
    if(value > 50){
      const that = this;
      setTimeout(()=>{
        that.counter = 0;
      }, 2000)
    }
  }
}
```

- 此图加插一张图，methods / computed / watch

10. shorthands

```diff
+ v-on:click ==> @click
+ v-bind:name ==> :name
- v-model ==> X
```

11. watch 除了可以检察 data 还可以监察 comouted 里面的 function

12. 
