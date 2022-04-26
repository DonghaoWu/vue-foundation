<template>
  <section>
    <h2>Username:{{ username }}</h2>
    <h3>Age:{{ age }}</h3>
  </section>
</template>

<script>
export default {
  props: ['username', 'age'],
};
</script>
