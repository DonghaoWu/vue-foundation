<template>
  <div>
    <stored-resources></stored-resources>
    <add-resource></add-resource>
  </div>
</template>

<script>
import StoredResources from '../StoredResources.vue';
import AddResource from '../AddResource.vue';
export default {
  components: {
    StoredResources,
    AddResource,
  },
  provide() {
    return {
      resources: this.storedResources,
      deleteResource: this.removeResource,
      addResource: this.addResource,
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
    addResource({ title, description, link }) {
      this.storedResources.unshift({
        id: new Date().toISOString(),
        title,
        description,
        link,
      });
    },
  },
};
</script>

<style></style>
