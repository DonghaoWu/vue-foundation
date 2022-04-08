1. unordered list

2. if the array is empty, don't show the paragraph.

3. render content conditionally

4. v-if

5. v-if 意味着消除整个 div，v-show 意味着 visibility = 0

6. multiple event modifier

7. v-else 必须紧跟着一个 v-if 或者 v-else-if block

8. v-show, 如果需要隐藏的或者消除的东西是有可能在之后的会反复出现或者隐藏，那就使用 v-show，如果只需要在加载时就能一次判断一个固定的显示/隐藏状态的话，就使用 v-if

9. v-for 处理 list

10. v-for 是使用在 li tag 中的，跟 react 的处理有点不一样

```html
<li v-for="goal in goals">{{goal}}</li>
```

11. 如果我们想显示 object 呢？

```html
<ul>
  <li v-for="(value, key, index) in {name:'Heo', age:'10'}">
    {{index}} - {{key}}: {{value}}
  </li>
</ul>
```

```html
<ul>
  <li v-for="num in 10">{{num}}</li>
</ul>
```

12. 未来可能需要 loop 嵌套的 object / array

13. remove items，在 for loop li 中使用 loop 中的 data 去加入 method

```html
<ul v-else>
  <li v-for="(goal, index) in goals" v-on:click="removeGoal(index)">
    {{goal}} - {{index}}
  </li>
</ul>
```

14. 为什么我们需要 key？

- input text 在删掉上一个之后没有跟着一起往上移动，而是保持在原位

- 所以最好的练习是 使用 unique ID / goal

- 为什么不能使用 index 作为 key？

- v-on:click.stop stop event bubbling

```html
<ul v-else>
  <li
    v-for="(goal, index) in goals"
    v-bind:key="goal"
    v-on:click="removeGoal(index)"
  >
    {{goal}} - {{index}}
    <input type="text" v-on:click.stop />
  </li>
</ul>
```

15. v-model , not v-modal

16. 使用 computed 替代 html 行内 js 逻辑。
