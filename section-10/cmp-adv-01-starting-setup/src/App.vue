<template>
  <div>
    <the-header></the-header>
    <badge-list></badge-list>
    <user-info
      :full-name="fullName"
      :role="role"
      :info-text="infoText"
    ></user-info>
    <course-goals-slot>
      <template v-slot:default="slotProps">
        <h2>{{ slotProps.slotGoal }}</h2>
        <h3>{{ slotProps['another'] }}</h3>
      </template>
    </course-goals-slot>
    <div>
      <button @click="setSelectedComponent('active-goal')">Active goal</button>
      <button @click="setSelectedComponent('manage-goal')">Manage goal</button>
      <component v-bind:is="selectedComponent"></component>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import BadgeList from './components/BadgeList.vue';
import UserInfo from './components/UserInfo.vue';
import CourseGoalsSlot from './components/CourseGoalsSlot.vue';
import ManageGoal from './components/ManageGoal.vue';
import ActiveGoal from './components/ActiveGoal.vue';

export default {
  components: {
    TheHeader,
    BadgeList,
    UserInfo,
    CourseGoalsSlot,
    ManageGoal,
    ActiveGoal,
  },
  data() {
    return {
      fullName: 'Danny',
      role: 'Front dev',
      infoText: 'top dev',
      selectedComponent: 'active-goal',
    };
  },
  methods: {
    setSelectedComponent(componentName) {
      this.selectedComponent = componentName;
    },
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
