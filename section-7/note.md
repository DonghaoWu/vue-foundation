1. components, 原始的 component 用法

2. install Vue CLI

3. commands

```bash
$ node -v
$ npm install -g @vue/cli
$ cd yourFolder
$ vue create vue-first-app

# manuall select features => Choose version, Babel, Linter => 3.x => basic => Lint on save => In dedicated config files => no preset

$ cd vue-first-app
$ npm run serve
```

4. project structure

- package.json => dependencies / devDependencies / scripts
- npm run serve / npm install /

5. public => index.html => <div id='app'></div>

6. src => main.js => App.vue => <template> / <script> / <style>

7. install `Vetur` extension to VS Code, 自动颜色化 vue file

8. A new vue project

```bash
# download the resource code
$ cd vue-course-complete-guide
$ npm install
$ npm run serve

# go to localhost 8080
$
```

9. component 的多个参数

```diff
+ export default
+ props
+ components
+ template
+ data
+ methods
+ computed
+ watch
```

10. Pass data from parent to child component

```diff
+ props:[
  'name',
  'phoneNumber',
  'email'
]
+ <friend-context></friend-contact>
```

```html
<friend-context name='tom' phone-number='123' email-address='a@w.com'></friend-contact>
```

```js
export default {
  props: ['name', 'phoneNumber', 'emailAddress'],
};
```

```html
<p>{{emailAddress}}</p>
```

11. 在子组件修改传递下来的参数是不允许的，it is not allowed to mutate the props in child component.

- single data direction

- 要解决上面这个问题的方法之一是参数本地化，如

```js
export default{
  props:['name'],
  data:{
    return{
      localName : this.name
    }
  }
}
```

12. vue 的神奇在于 : & {{}}, 还有自动识别参数（包括 props 里面的还有 data 里面的，当然还有 methods 和 computed 里面的）

13. validating props

```js
export default {
  props: {
    name: {
      type: String,
      required: true,
      validator:function(value){
        return value === 'tom' || value === 'mary'
      }
    },
    phoneNumber: {type:String, default:'111'}
    emailAddress: String,
  },
};
```

14. working with Dynamic prop values

```diff
- <friend isFavorite='true'></friend>

+ <friend :isFavorite='true'></friend>
```

15. emitting custom events

```diff
+ pass method from parent to child
+ 一个 method 传递到 child component 之后调用并修改 parent component 之后的 data
```

```js
// 父
<friend-contact
  v-on:toggle-favorite='toggleFavoriteStatus'
></friend-contact>

toggleFavoriteStatus(friendId){
  const identifiedFriend = this.friends.find((friend)=> friend.id === friendId);
  identifiedFriend.isFavorite = !identifiedFriend.isFavorite
}

// 子
toggleFavorite(){
  this.$emit('toggle-favorite', this.id)
}
```

```diff
+ data 从父到子，:first-name => firstName

+ method 从父到子, @toggle-favorite="toggleFavoriteStatus"
```

16. emits

```diff
+ props:['','']
+ emits:['toggle-favorite', ''],

+ emits: {
  'toggle-favorite': function(id){
    if(id){
      return true
    }
    else{
      console.warn('id is missing.')
      return false
    }
  }
}
```
