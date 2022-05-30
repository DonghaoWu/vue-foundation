<template>
  <div>
    <the-header title="RememberMe"></the-header>
    <stored-resource :resources='storedResources'></stored-resource>
  </div>
</template>

<script>
import StoredResource from './components/StoredResource';
import TheHeader from './components/layout/TheHeader'

export default {
  components: {
    StoredResource,
    TheHeader
  },
  data() {
    return {
      storedResources: [
        {
          id: 'official-guide',
          title: 'Official Guide',
          description: 'The official Vue.js documentation',
        },
        {
          id: 'google',
          title: 'Google',
          description: 'Google website',
        },
      ],
    };
  },
};
</script>

<style>
/* paste css style here */
</style>

</style>
