<template>
  <div>
    <base-card>
      <base-button
        @click="setSelectedTab('stored-resources')"
        :mode="storedResButtonMode"
        >Stored Resources</base-button
      >
      <base-button
        :mode="addResButtonMode"
        @click="setSelectedTab('add-resource')"
        >Add Resource</base-button
      >
    </base-card>
    <keep-alive>
      <component :is="selectedTab"></component>
    </keep-alive>
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
      selectedTab: 'stored-resources',
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
            this.selectedTab = 'stored-resources';
    },
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
  },
  computed: {
    storedResButtonMode() {
      return this.selectedTab === 'stored-resources' ? null : 'flat';
    },
    addResButtonMode() {
      return this.selectedTab === 'add-resource' ? null : 'flat';
    },
  },
};
</script>

<style></style>
