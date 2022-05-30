<template>
  <li>
    <base-card>
      <header>
        <h3>{{ title }}</h3>
        <button>Delete</button>
      </header>
      <p>{{ description }}</p>
      <nav><a :href="link">View Resource</a></nav>
    </base-card>
  </li>
</template>

<script>
export default {
  props: ['title', 'link', 'description'],
  components: {
    BaseCard,
  },
};
</script>

<style scoped>
/* paste */
</style>
