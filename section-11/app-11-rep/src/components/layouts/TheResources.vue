<template>
  <div><stored-resources></stored-resources></div>
</template>

<script>
import StoredResources from '../StoredResources.vue';
export default {
  components: {
    StoredResources,
  },
  data() {
    return {
      storedResources: [
        {
          id: 'official-guide',
          title: 'Official Guide',
          description: 'The official Vue.js documentation',
          link: 'https://vuejs.org',
        },
        {
          id: 'google',
          title: 'Google',
          description: 'Google website',
          link: 'https://vuejs.org',
        },
      ],
    };
  },
};
</script>

<style></style>
