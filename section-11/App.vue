<template>
  <div>
    <the-header title="RememberMe"></the-header>
    <the-resource></the-resource>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader'
import TheResource from './components/layour/TheResource'

export default {
  components: {
    TheHeader,
    TheResource
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
