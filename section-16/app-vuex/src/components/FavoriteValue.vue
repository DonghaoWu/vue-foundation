<template>
  <div>
    <h3>{{ counter }}</h3>
    <p>This is Favorite.vue</p>
  </div>
</template>

<script>
export default {
  computed: {
    counter() {
      return this.$store.state.counter;
    },
  },
};
</script>

<style></style>
