<template>
  <stored-resources></stored-resources>
</template>

<script>
import StoredResources from '../StoredResources.vue';
export default {
  components: {
    StoredResources,
  },
  provide() {
    return {
      resources: this.storedResources,
      deleteResource: this.removeResource,
    };
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
  methods: {
    removeResource(resId) {
      const resIndex = this.storedResources.findIndex(
        (res) => res.id === resId
      );
      this.storedResources.splice(resIndex, 1);
    },
  },
};
</script>

<style></style>
