1. conponent registration & styling

2. slots @dynamic components

3. naming & folder structure

4. commands

```bash
$ npm install
$ npm run serve
```

5. global component & local component

6. local component is better than global component

- load them all when load the application at the initial state

```js
<template>
<the-header></the-header>
</template>
<script>
  import The Header from 'components/TheHeader.vue'; export default{
    components:{
      'the-header': TheHeader,
      TheHeader: TheHeader,
      TheHeader
    }
  }
</script>
```

7. local styling

```html
<style scoped></style>
```

8. slots

- use a component as a wrapper

- create a slot

```js
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>
```

- global registration

```js
import BaseCardSlot from './components/BaseCardSlot.vue';

app.component('base-card-slot', BaseCardSlot);
```

- apply

```js
<template>
  <section>
    <base-card-slot>
      <header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </header>
      <p>{{ infoText }}</p>
    </base-card-slot>
  </section>
</template>
```

9. named slots

- you must have at least one named slot.
- 多个 slot 的情况

```js
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

```js
<template>
  <section>
    <base-card-slot>
      <template v-slot:header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </template>
      <p>{{ infoText }}</p>
    </base-card-slot>
  </section>
</template>
```

- 以下这个必须要清楚，是一个很容易混淆的点

```html
<h3>{{ fullName }}</h3>
<base-badge :type="role" :caption="role.toUpperCase()"></base-badge>

<!-- 相当于 -->
<slot name="header"></slot>
```

10. more on slots

- default fallback

```js
<template>
  <div>
    <header>
      <slot name="header">
        <h2>The default h2 fallback</h2>
      </slot>
    </header>
    <slot></slot>
  </div>
</template>
```

- 如果 slot 里面没内容，则删除，如下

```js
<template>
  <section>
    <base-card-slot>
      <template v-slot:header>
        < 这里没有内容 >
      </template>
      <template v-slot:default>
        <ul>
          <li>
            <base-badge type="admin" caption="ADMIN"></base-badge>
          </li>
          <li>
            <base-badge type="author" caption="AUTHOR"></base-badge>
          </li>
        </ul>
      </template>
    </base-card-slot>
  </section>
</template>
```

```js
<template>
  <div>
    <header v-if="$slots.header">
      <slot name="header">
        <h2>The default h2 fallback</h2>
      </slot>
    </header>
    <slot></slot>
  </div>
</template>
```

- 这是一个小的提升，正常情况下不加 v-if 对 UI 没有影响，但是加了之后可以删除 DOM 里面无内容的 node、，起到提升效率的目的。

11. 简写

```js
<template>
  <section>
    <base-card-slot>
      <template #header>
        < 这里没有内容 >
      </template>
      <template #default>
        <ul>
          <li>
            <base-badge type="admin" caption="ADMIN"></base-badge>
          </li>
          <li>
            <base-badge type="author" caption="AUTHOR"></base-badge>
          </li>
        </ul>
      </template>
    </base-card-slot>
  </section>
</template>
```

12. scoped slots

- 这是关于如何从 slot 向实际 component 传递变量
- 传递局部变量

```html
<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <slot v-bind:slotGoal="goal" another="..."></slot>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        goals: ['Learn Vue', 'Finish the course'],
      };
    },
  };
</script>
```

- 或者简单的传递

```html
<template>
  <div>
    <slot v-bind:slotGoal="goals[0]"></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goals: ['Learn Vue', 'Finish the course'],
      };
    },
  };
</script>
```

```html
<course-goals-slot>
  <template v-slot:default="slotProps">
    <h2>{{ slotProps.slotGoal }}</h2>
    <h3>{{ slotProps['another'] }}</h3>
  </template>
</course-goals-slot>
```

- 当只有 1 个 slot 的时候

```html
<course-goals-slot v-slot:default="slotProps">
  <h2>{{ slotProps.slotGoal }}</h2>
  <h3>{{ slotProps['another'] }}</h3>
</course-goals-slot>
```

13. slot 的难点在于找到对应的 div

14. dynammic component

- 减少 v-if 的重复

```html
<template>
  <div>
    <the-header></the-header>
    <button @click="setSelectedComponent('active-goal')">Active goal</button>
    <button @click="setSelectedComponent('manage-goal')">Manage goal</button>
    <!-- <manage-goal v-if="selectedComponent === 'manage-goal'"></manage-goal>
    <active-goal v-if="selectedComponent === 'active-goal'"></active-goal> -->
    <component v-bind:is="selectedComponent"></component>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader.vue';
  // import BadgeList from './components/BadgeList.vue';
  // import UserInfo from './components/UserInfo.vue';
  // import CourseGoalsSlot from './components/CourseGoalsSlot.vue';
  import ManageGoal from './components/ManageGoal.vue';
  import ActiveGoal from './components/ActiveGoal.vue';

  export default {
    components: {
      TheHeader,
      ManageGoal,
      ActiveGoal,
    },
    data() {
      return {
        selectedComponent: 'active-goal',
        activeUser: {
          name: 'Maximilian Schwarzmüller',
          description: 'Site owner and admin',
          role: 'admin',
        },
      };
    },
    methods: {
      setSelectedComponent(cmp) {
        this.selectedComponent = cmp;
      },
    },
  };
</script>

<style>
  html {
    font-family: sans-serif;
  }

  body {
    margin: 0;
  }
</style>
```

15. keep dynamic component alive

- 保持组件的修改状态

```html
<template>
  <div>
    <h2>Manage Goal</h2>
    <input type="text" />
  </div>
</template>

<script>
  export default {};
</script>

<style></style>
```

```html
<keep-alive>
  <component v-bind:is="selectedComponent"></component>
</keep-alive>
```

16. customize error slot

```html
<template>
  <div>
    <h2>Manage Goal</h2>
    <input type="text" ref="goal" />
    <button @click="setGoal">Set Goal</button>
    <my-error-alert v-if="inputIsInvalid">
      <h2>Input is invalid</h2>
      <p>Please input something.</p>
    </my-error-alert>
  </div>
</template>

<script>
  import MyErrorAlert from './MyErrorAlert.vue';
  export default {
    components: {
      MyErrorAlert,
    },
    data() {
      return {
        inputIsInvalid: false,
      };
    },
    methods: {
      setGoal() {
        const enteredValue = this.$refs.goal.value;
        if (enteredValue === '') {
          this.inputIsInvalid = true;
        }
      },
    },
  };
</script>
```

```html
<template>
  <dialog open>
    <slot></slot>
  </dialog>
</template>

<script>
  export default {};
</script>

<style scoped>
  dialog {
    position: fixed;
    top: 20vh;
    left: 30%;
    width: 40%;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
</style>
```

17. teleproting

- 目前 dialog 是在 ManageGoal 的同一层的，但我们想把它显示在第一层

```html
<template>
  <div>
    <h2>Manage Goal</h2>
    <input type="text" ref="goal" />
    <button @click="setGoal">Set Goal</button>
    <teleport to="#app">
      <my-error-alert v-if="inputIsInvalid">
        <h2>Input is invalid</h2>
        <p>Please input something.</p>
      </my-error-alert>
    </teleport>
  </div>
</template>
```

18. Fragments

- Vue 3 可以不限制 1 个 component 里面必须要一个 div，但是 vue 2 是必须限制的。

19. Vue style Guide

- 这是网上 Vue.js 的指引

20. Move to a different folder structure

```diff
+ UI folder
+ Layout folder
+ products
+ 
```

21. 
