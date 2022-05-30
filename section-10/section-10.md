# Vue development tools (Part 10)

### `Key Word: component communication practice.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Vue Basics)

### `Summary`: In this documentation, we practice some advanced vue component features.

### `Check Dependencies & Tools:`

- null

#### `本章背景：`

- 本章主要介绍一些常用的高阶 vue component 的用法。

- **要点**

  ```diff
  + Local component registration
  + scoped styling
  + slot
  + mutiple slots
  + slot fall back
  + slot improvement
  + slot shorthand
  + scoped slots
  + slot props
  + dynammic component
  + keep dynamic component alive
  + customize error slot
  + teloproting
  + Fragements
  ```

- **难点**

  ```diff
  + 定位 slot 对应位置
  + css 代码重用
  ```

### <span id="1.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [1.1 Local component registration & scoped styling.](#1.1)
- [1.2 Single slot.](#1.2)
- [1.3 Multiple slots.](#1.3)
- [1.4 One way to improve slot performance & shorthand.](#1.4)
- [1.5 Scoped slot.](#1.5)
- [1.6 Customize error slot. & Teleporting](#1.6)
- [1.7 Dynamic component.](#1.7)

---

### <span id="1.1">`Step1: Local component registration & scoped styling.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 关键语句

  ```diff
  - Local component registration
  + <script>
  +   import TheHeader from './components/TheHeader.vue';

  + export default {
  +     components: {
  +       TheHeader,
  +     }
  + }
  + </script>

  - scoped styling
  +  <style scoped>
  + html {
  +   font-family: sans-serif;
  + }

  + body {
  +   margin: 0;
  + }
  + </style>
  ```

  2. 例子

  - src/components/NewFriend.vue

    ```html
    <template>
      <div>
        <the-header></the-header>
        <badge-list></badge-list>
        <user-info
          :full-name="fullName"
          :role="role"
          :info-text="infoText"
        ></user-info>
      </div>
    </template>

    <script>
      import TheHeader from './components/TheHeader.vue';
      import BadgeList from './components/BadgeList.vue';
      import UserInfo from './components/UserInfo.vue';

      export default {
        components: {
          TheHeader,
          BadgeList,
          UserInfo,
        },
        data() {
          return {
            fullName: 'Danny',
            role: 'Front dev',
            infoText: 'top dev',
          };
        },
      };
    </script>

    <style scoped>
      html {
        font-family: sans-serif;
      }

      body {
        margin: 0;
      }
    </style>
    ```

#### `Comment:`

1.

---

### <span id="1.2">`Step2: Single slot.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 关键代码

  - main.js

  ```js
  import BaseCardSlot from './components/BaseCardSlot.vue';
  app.component('base-card-slot', BaseCardSlot);
  ```

  - BaseCardSlot.vue

  ```html
  <template>
    <div>
      <slot></slot>
    </div>
  </template>

  <script>
    export default {};
  </script>
  ```

  - UserInfo.vue

  ```html
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

#### `Comment:`

1. 单一 slot 的对应关系

```diff
- <template v-slot:default>
+   <header>
+     <h3>{{ fullName }}</h3>
+     <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
+   </header>
+   <p>{{ infoText }}</p>
- </template>

- <slot> </slot>
```

---

### <span id="1.3">`Step3: Multiple slots.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 关键代码

  ```diff
  + <slot name="header"></slot>
  + <template v-slot:header></template>
  ```

  - main.js

  ```js
  import BaseCardSlot from './components/BaseCardSlot.vue';
  app.component('base-card-slot', BaseCardSlot);
  ```

  - BaseCardSlot.vue

  ```html
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

  - UserInfo.vue

  ```html
  <template>
    <section>
      <base-card-slot>
        <template v-slot:header>
          <h3>{{ fullName }}</h3>
          <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
        </template>
        <template v-slot:default>
          <p>{{ infoText }}</p>
        </template>
      </base-card-slot>
    </section>
  </template>
  ```

#### `Comment:`

1. 多个 slot 的对应关系

- 第一个 slot

```diff
- <template v-slot:header>
+   <h3>{{ fullName }}</h3>
+  <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
- </template>

-  <slot name="header">
+     <h2>The default h2 fallback</h2>
-  </slot>
```

- 第二个 slot

```diff
- <template v-slot:default>
+   <p>{{ infoText }}</p>
- </template>

- <slot> </slot>
```

2. 上面还有一个 default fallback 的概念，意思就是如果对应套用的实际 slot 里面如果没有对应的 h2 tag，就添加这个 h2 tag 的内容，主要适用于一些`读取中或者固定提示信息的场合`。

```html
<h2>The default h2 fallback</h2>
```

3. 目前看到的 slot 的作用是套用 style，比如说如果对应关系如下：

```diff
- <template v-slot:header>
-   <h3>{{ fullName }}</h3>
-  <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
- </template>

+  <header>
-    <slot name="header">
-      <h2>The default h2 fallback</h2>
-    </slot>
+  </header>

- 相当于
+  <header>
+     <h3>{{ fullName }}</h3>
+     <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
+  </header>
```

- 这样就可以把 header 的 styling 套用在实际内容的 `<h3>` 和 `<base-badge>` 中。

- 所以 slot 可以看作是 css 代码重用的一个 feature。
- 通过命名模式可以快速定位相应的模块。

### <span id="1.4">`Step4: One way to improve slot performance & shorthand.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 关键代码

  ```html
  <base-card-slot>
    <template v-slot:header></template>
    <template v-slot:default></template>
  </base-card-slot>

  <template>
    <div>
      <header v-if="$slots.header">
        <slot name="header"></slot>
      </header>
      <div class="my-class" v-if="@slots.default">
        <slot></slot>
      </div>
    </div>
  </template>
  ```

  2. slot 简写

  ```html
  <base-card-slot>
    <template #header></template>
    <template #default></template>
  </base-card-slot>
  ```

#### `Comment:`

1. 如果在实际 vue 中 slot 没有内容，则可以通过 v-if 删去对应的 node 以提升 performance。

### <span id="1.5">`Step5: Scoped slot.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 这里主要是关于如何从 slot 向 vue component 文件传输 data

  2. 简单传递 1 个变量

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
    </template>
  </course-goals-slot>
  ```

  3. 传递多个变量

  - CourseGoalsSlot.vue

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

  - App.vue

  ```html
  <template>
    <div>
      <course-goals-slot>
        <template v-slot:default="slotProps">
          <h2>{{ slotProps.slotGoal }}</h2>
          <h3>{{ slotProps['another'] }}</h3>
        </template>
      </course-goals-slot>
    </div>
  </template>

  <script>
    import CourseGoalsSlot from './components/CourseGoalsSlot.vue';

    export default {
      components: {
        CourseGoalsSlot,
      },
    };
  </script>
  ```

#### `Comment:`

1. 对应关系

```diff
- <ul>
-  <li v-for="goal in goals" :key="goal">
+     <slot v-bind:slotGoal="goal" another="..."></slot>
-  </li>
- </ul>

- <template v-slot:default="slotProps">
+   <h2>{{ slotProps.slotGoal }}</h2>
+   <h3>{{ slotProps['another'] }}</h3>
- </template>
```

2. 这个就比较复杂，还原之后应该是

```html
<ul>
  <li v-for="goal in goals" :key="goal">
    <h2>{{ goal }}</h2>
    <h3>...</h3>
  </li>
</ul>
```

3. `对于这一小节的要求是掌握从 slot 传递变量到 component。`

### <span id="1.6">`Step6: Customize error dialog slot. & Teleporting.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 关键代码

  2. 建立一个 dialog slot

  - MyErrorAlert.vue

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
      margin: 0;
      position: fixed;
      top: 20vh;
      left: 30%;
      width: 40%;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    }
  </style>
  ```

  3. 套用 slot

  - ManageGoal.vue

  ```html
  <template>
    <div>
      <h2>Manage Goal</h2>
      <input type="text" ref="goal" />
      <button @click="setGoal">Set Goal</button>
      <my-error-alert v-if="inputIsInvalid">
        <h2>Input is invalid.</h2>
        <p>Please input something.</p>
        <button @click="confirmError">Got it</button>
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
        confirmError() {
          this.inputIsInvalid = false;
        },
      },
    };
  </script>
  ```

  4. 使用 Teleporting 使 component 的层级上升到 app 层

  ```html
  <teleport to="#app">
    <my-error-alert v-if="inputIsInvalid">
      <h2>Input is invalid.</h2>
      <p>Please input something.</p>
      <button @click="confirmError">Got it</button>
    </my-error-alert>
  </teleport>
  ```

#### `Comment:`

1.

### <span id="1.7">`Step7: Dynamic component & alive.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

  1. 关键代码

  ```html
  <div>
    <button @click="setSelectedComponent('active-goal')">Active goal</button>
    <button @click="setSelectedComponent('manage-goal')">Manage goal</button>
    <manage-goal v-if="selectedComponent === 'manage-goal'"></manage-goal>
    <active-goal v-if="selectedComponent === 'active-goal'"></active-goal>
  </div>
  ```

  2. 改成

  ```html
  <div>
    <the-header></the-header>
    <button @click="setSelectedComponent('active-goal')">Active goal</button>
    <button @click="setSelectedComponent('manage-goal')">Manage goal</button>
    <component v-bind:is="selectedComponentName"></component>
  </div>

  <script>
    export default {
      components: {
        ManageGoal,
        ActiveGoal,
      },
      data() {
        return {
          selectedComponentName: 'active-goal',
        };
      },
      methods: {
        setSelectedComponent(componentName) {
          this.selectedComponentName = componentName;
        },
      },
    };
  </script>
  ```

  3. 保持 alive 的状态

  ```html
  <keep-alive>
    <component v-bind:is="selectedComponent"></component>
  </keep-alive>
  ```

#### `Comment:`

1.

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)
```
