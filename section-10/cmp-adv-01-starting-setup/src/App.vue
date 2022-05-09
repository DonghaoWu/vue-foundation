<template>
  <div>
    <the-header></the-header>
    <button @click="setSelectedComponent('active-goal')">Active goal</button>
    <button @click="setSelectedComponent('manage-goal')">Manage goal</button>
    <!-- <manage-goal v-if="selectedComponent === 'manage-goal'"></manage-goal>
    <active-goal v-if="selectedComponent === 'active-goal'"></active-goal> -->
    <keep-alive>
      <component v-bind:is="selectedComponent"></component>
    </keep-alive>
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
