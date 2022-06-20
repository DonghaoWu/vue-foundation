1. routing setup

```bash
$ npm install --save vue-router@next
```

2. main.js

```js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamList from './components/teams/TeamList.vue';
import UsersList from './components/teams/TeamList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      TeamList,
    },
    {
      path: '/users',
      UserList,
    },
    (linkActiveClass: 'router-link-active'), // default
  ],
});
const app = createApp(App);

app.use(router);

app.mount('#app');
```

3. do adjustment in App.vue

```html
<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>
```

4. do adjustment in TheNavigation.vue

```html
<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/teams">Teams</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
```

5. change styles

```diff
- button {
-   font: inherit;
+ a {
+ text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

- button:hover,
- button:active {
+ a:hover,
+ a:active
+ a.router-link-active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
```

6. UserList.vue, 使用 this.$router.push() 实现 link 功能

```html
<template>
  <button @click="confirmInput">Confirm</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
  import UserItem from './UserItem.vue';

  export default {
    components: {
      UserItem,
    },
    inject: ['users'],
    methods: {
      confirmInput() {
        this.$router.push('/teams');
      },
    },
  };
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 2rem auto;
    max-width: 20rem;
    padding: 0;
  }
</style>
```

7. Passing Data with Route Params

```js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamList from './components/teams/TeamList.vue';
import UsersList from './components/teams/TeamList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: TeamList,
    },
    {
      path: '/users',
      component: UserList,
    },
    {
      path: '/teams/:teamId',
      component: TeamMembers,
    },
  ],
  linkActiveClass: 'router-link-active', // default
});
const app = createApp(App);

app.use(router);

app.mount('#app');
```

8. TeamMembers.vue

```html
<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :id="team.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
  import UserItem from '../users/UserItem.vue';

  export default {
    inject: ['users', 'teams'],
    components: {
      UserItem,
    },
    data() {
      return {
        teamName: '',
        members: '',
      };
    },
    created() {
      const teamId = this.$route.params.teamId;
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (let member of menbers) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  };
</script>

<style scoped>
  section {
    margin: 2rem auto;
    max-width: 40rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    border-radius: 12px;
  }

  h2 {
    margin: 0.5rem 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
```

9. Navigation & Dynamic Paths

- TeamsItem.vue

```html
<template>
  <li>
    <h3>{{ name }}</h3>
    <div class="team-members">{{ memberCount }} Members</div>
    <router-link :to="`/teams/${id}`">View Members</router-link>
  </li>
</template>

<script>
  export default {
    props: ['id', 'name', 'memberCount'],
  };
</script>

<style scoped>
  li {
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 12px;
    padding: 1rem;
  }

  li h3 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
  }

  li .team-members {
    margin: 0.5rem 0;
  }

  a {
    text-decoration: none;
    color: white;
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background-color: #11005c;
  }

  a:hover,
  a:active {
    background-color: #220a8d;
  }
</style>
```

9. Updating Params Data with Watchers

- TeamMembers.vue
- 因为在 created 中只能处理 teamId 一次，所以在这个页中再跳转到 t2 是看不到页面的变化的，有变化的只是 url

```html
<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :id="team.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
  import UserItem from '../users/UserItem.vue';

  export default {
    inject: ['users', 'teams'],
    components: {
      UserItem,
    },
    data() {
      return {
        teamName: '',
        members: '',
      };
    },
    methods: {
      loadTeamMembers(route) {
        const teamId = route.params.teamId;
        const selectedTeam = this.teams.find((team) => team.id === teamId);
        const members = selectedTeam.members;
        const selectedMembers = [];
        for (let member of menbers) {
          const selectedUser = this.users.find((user) => user.id === member);
          selectedMembers.push(selectedUser);
        }
        this.members = selectedMembers;
        this.teamName = selectedTeam.name;
      },
    },
    created() {
      this.loadTeamMembers(this.$route);
    },
    watch: {
      $route(newValue) {
        this.loadTeamMembers(newValue);
      },
    },
  };
</script>
```

10. Passing Params as Props

- 以下实现的是如何把 teamId 作为 props 传递到 component

```html
<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :id="team.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
  import UserItem from '../users/UserItem.vue';

  export default {
    inject: ['users', 'teams'],
    props: ['teamId'],
    components: {
      UserItem,
    },
    data() {
      return {
        teamName: '',
        members: '',
      };
    },
    methods: {
      loadTeamMembers(teamId) {
        const selectedTeam = this.teams.find((team) => team.id === teamId);
        const members = selectedTeam.members;
        const selectedMembers = [];
        for (let member of menbers) {
          const selectedUser = this.users.find((user) => user.id === member);
          selectedMembers.push(selectedUser);
        }
        this.members = selectedMembers;
        this.teamName = selectedTeam.name;
      },
    },
    created() {
      this.loadTeamMembers(this.teamId);
    },
    watch: {
      teamId(newValue) {
        this.loadTeamMembers(newValue);
      },
    },
  };
</script>
```

```js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamList from './components/teams/TeamList.vue';
import UsersList from './components/teams/TeamList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: TeamList,
    },
    {
      path: '/users',
      component: UserList,
    },
    {
      path: '/teams/:teamId',
      component: TeamMembers,
      props: true,
    },
  ],
  linkActiveClass: 'router-link-active', // default
});
const app = createApp(App);

app.use(router);

app.mount('#app');
```

11. redirecting & catch all routes

```js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamList from './components/teams/TeamList.vue';
import UsersList from './components/teams/TeamList.vue';
import NotFound from './components/nav/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: '/', component: TeamList },
    // { path: '/', redirect: '/teams' },
    // {
    //   path: '/teams',
    //   component: TeamList,
    //   alias: '/'
    // },
    {
      path: '/teams',
      component: TeamList,
    },
    {
      path: '/users',
      component: UserList,
    },
    {
      path: '/teams/:teamId',
      component: TeamMembers,
      props: true,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
});
const app = createApp(App);

app.use(router);

app.mount('#app');
```

- not found Page

```html
<template>
  <h2>
    Page not found! Maybe view our <router-link to="/teams">Teams</router-link>?
  </h2>
</template>

<script>
  export default {};
</script>

<style></style>
```

12. Using Nested Routes

```js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamList from './components/teams/TeamList.vue';
import UsersList from './components/teams/TeamList.vue';
import NotFound from './components/nav/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: TeamList,
      children: [
        {
          path: '/:teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: UserList,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
});
const app = createApp(App);

app.use(router);

app.mount('#app');
```

- TeamList

```html
<template>
  <router-view></router-view>
  <ul>
    <teams-item
      v-for="team in teams"
      :key="team.id"
      :name="team.name"
      :member-count="team.members.length"
    ></teams-item>
  </ul>
</template>
```

13. More Fun with Named Routes & Location Objects

- TeamItem.vue

```html
<template>
  <li>
    <h3>{{ name }}</h3>
    <div class="team-members">{{ memberCount }} Members</div>
    <router-link :to="`teamMembersLink">View Members</router-link>
  </li>
</template>

<script>
  export default {
    props: ['id', 'name', 'memberCount'],
    teamMembersLink() {
      // return '/teams/' + this.id;
      // return { path: 'teams' + this.id };
      // this.$router.push({ name: 'team-members', params: { teamId: this.id } });
      return { name: 'team-members', params: { teamId: this.id } };
    },
  };
</script>
```

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:'teams'
      path: '/teams',
      component: TeamList,
      children: [
        {
          name:'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: UserList,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
});
```

14. Using Query Params

```html
<script>
  export default {
    props: ['id', 'name', 'memberCount'],
    teamMembersLink() {
      // return '/teams/' + this.id;
      // return { path: 'teams' + this.id };
      // this.$router.push({ name: 'team-members', params: { teamId: this.id } });
      return {
        name: 'team-members',
        params: { teamId: this.id },
        query: { sort: 'asc' },
      };
    },
  };
</script>
```

```js
    created() {
      this.loadTeamMembers(this.teamId);
      console.log(this.$route.query,)
    },
```

15. Rendering Multiple Routes with Named Router views

```html
<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <router-view name="footer"></router-view>
  </footer>
</template>
```

- TeamsFooter.vue

```html
<template>
  <h2>Teams Footer</h2>
</template>
```

- UsersFooter.vue

```html
<template>
  <h2>Users Footer</h2>
</template>
```

```js
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:'teams'
      path: '/teams',
      component: {default: TeamList, footer: TeamsFooter},
      children: [
        {
          name:'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: {
        default: UsersList,
        footer: UsersFooter
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
});
```

16. Controlling scroll behavior

- main.js

```js
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:'teams'
      path: '/teams',
      component: {default: TeamList, footer: TeamsFooter},
      children: [
        {
          name:'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: {
        default: UsersList,
        footer: UsersFooter
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
  scrollBehavior(to, from, savedPositioin){
    if(savedPosition){
      return savedPosition
    }
    return {
      left:0,
      right:0
    }
  }
});
```

16. Introducing navigation guards

```js
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:'teams'
      path: '/teams',
      component: {default: TeamList, footer: TeamsFooter},
      children: [
        {
          name:'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: {
        default: UsersList,
        footer: UsersFooter
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
    scrollBehavior(to, from, savedPositioin){
    if(savedPosition){
      return savedPosition
    }
    return {
      left:0,
      right:0
    }
  }
});

router.beforeEach(function(to, from, next){
  // next(false)
  if(to.name === 'team-members'){
    next()
  }else{
    next({name:'team-members', params: {teamId:'t2'}})
  }
})
```

17. Diving deeper into Navigation guards

```js
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:'teams'
      path: '/teams',
      component: {default: TeamList, footer: TeamsFooter},
      children: [
        {
          name:'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next){
        next()
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
    scrollBehavior(to, from, savedPositioin){
    if(savedPosition){
      return savedPosition
    }
    return {
      left:0,
      right:0
    }
  }
});

router.beforeEach(function(to, from, next){
  // next(false)
  // if(to.name === 'team-members'){
  //   next()
  // }else{
  //   next({name:'team-members', params: {teamId:'t2'}})
  // }
  next()
})
```

- UserList.vue

```html
<template>
  <button @click="confirmInput">Confirm</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
  import UserItem from './UserItem.vue';

  export default {
    components: {
      UserItem,
    },
    inject: ['users'],
    methods: {
      confirmInput() {
        this.$router.push('/teams');
      },
    },
    beforerouterEnter(to, from, next) {
      next();
    },
  };
</script>
```

- TeamMembers.vue

```html
<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :id="team.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
  import UserItem from '../users/UserItem.vue';

  export default {
    inject: ['users', 'teams'],
    components: {
      UserItem,
    },
    data() {
      return {
        teamName: '',
        members: '',
      };
    },
    methods: {
      loadTeamMembers(route) {
        const teamId = route.params.teamId;
        const selectedTeam = this.teams.find((team) => team.id === teamId);
        const members = selectedTeam.members;
        const selectedMembers = [];
        for (let member of menbers) {
          const selectedUser = this.users.find((user) => user.id === member);
          selectedMembers.push(selectedUser);
        }
        this.members = selectedMembers;
        this.teamName = selectedTeam.name;
      },
    },
    created() {
      this.loadTeamMembers(this.$route);
    },
    beforeRouteUpdated(to, from, next) {
      this.loadTeamMembers(to.params.teamId);
      next();
    },
    watch: {
      $route(newValue) {
        this.loadTeamMembers(newValue);
      },
    },
  };
</script>
```

18. The global afterEach guard

19. Beyond Entering: Route Leave Guards

- main.js

```js
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:'teams'
      path: '/teams',
      component: {default: TeamList, footer: TeamsFooter},
      children: [
        {
          name:'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next){
        next()
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
    scrollBehavior(to, from, savedPositioin){
    if(savedPosition){
      return savedPosition
    }
    return {
      left:0,
      right:0
    }
  }
});

router.beforeEach(function(to, from, next){
  // next(false)
  // if(to.name === 'team-members'){
  //   next()
  // }else{
  //   next({name:'team-members', params: {teamId:'t2'}})
  // }
  next()
})
```

- UserList.vue

```html
<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
  import UserItem from './UserItem.vue';

  export default {
    components: {
      UserItem,
    },
    inject: ['users'],
    data() {
      return { changesSaved: false };
    },
    methods: {
      confirmInput() {
        this.$router.push('/teams');
      },
      saveChanges() {
        this.changesSaved = true;
      },
    },
    beforerouterEnter(to, from, next) {
      next();
    },
    beforeRouteLeave(to, from, next) {
      if (this.changesSaved) {
        next();
      } else {
        const message = confirm('Are you sure? You got unsaved changes!');
        next(message);
      }
    },
    unmounted() {
      console.log('unmounted');
    },
  };
</script>
```

19. Utillizing Route Metadata

- main.js

```js
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:'teams'
      path: '/teams',
      meta: {needsAuth: true},
      component: {default: TeamList, footer: TeamsFooter},
      children: [
        {
          name:'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next){
        next()
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'router-link-active', // default
    scrollBehavior(to, from, savedPositioin){
    if(savedPosition){
      return savedPosition
    }
    return {
      left:0,
      right:0
    }
  }
});

router.beforeEach(function(to, from, next){
  // next(false)
  // if(to.name === 'team-members'){
  //   next()
  // }else{
  //   next({name:'team-members', params: {teamId:'t2'}})
  // }
  if(to.meta.needsAuth){
    console.log('needs auth!');
    next()
  }else{
    next()
  }
})
```

20. Organizing route files

```diff
+ pages: NotFound.vue / TeamsFooter / TeamsList / UsersFooter / UsersList.vue

+ router.js
- export default router
+ import router from './router.js'
```

21. 
