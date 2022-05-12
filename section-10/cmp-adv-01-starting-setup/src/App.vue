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
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import BadgeList from './components/BadgeList.vue';
import UserInfo from './components/UserInfo.vue';
import CourseGoalsSlot from './components/CourseGoalsSlot.vue';

export default {
  components: {
    TheHeader,
    BadgeList,
    UserInfo,
    CourseGoalsSlot,
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
