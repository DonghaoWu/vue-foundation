<template>
  <div>
    <base-card>
      <base-button @click="setSelectedTab('stored-resources')"
        >Stored Resources</base-button
      >
      <base-button @click="setSelectedTab('add-resource')"
        >Add Resource</base-button
      >
    </base-card>
    <component :is="selectedTab"></component>
  </div>
</template>

<script>
import StoredResources from './StoredResource.vue';
import AddSource from './AddSource';
export default {
  components: {
    StoredResources,
    AddSource,
  },
  data() {
    return {
      selectedTab: 'stored-resources',
    };
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>

<style></style>
