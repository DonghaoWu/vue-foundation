<template>
  <li>
    <base-card>
      <header>
        <h3>{{ title }}</h3>
        <base-button mode="flat" @click="removeResource(id)"
          >Delete</base-button
        >
      </header>
      <p>{{ description }}</p>
      <nav><a :href="link">View Resource</a></nav>
    </base-card>
  </li>
</template>

<script>
export default {
  props: ['id', 'title', 'link', 'description'],
  inject: ['removeResource'],
  components: {
    BaseCard,
  },
};
</script>

<style scoped>
/* paste */
</style>
