<template>
  <ul>
    <learning-resource
      v-for="res in resources"
      :key="res.id"
      :title="res.title"
      :description="res.description"
      :link="res.link"
      :id="res.id"
    ></learning-resource>
  </ul>
</template>

<script>
import LearningResource from './LearningResource';
export default {
  inject: ['resources'],
  components: {
    LearningResource,
  },
};
</script>

<style scoped>
/* paste your styles here */
</style>
