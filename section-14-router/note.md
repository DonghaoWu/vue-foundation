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
