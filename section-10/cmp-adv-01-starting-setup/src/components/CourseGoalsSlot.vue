<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <slot v-bind:slotGoal="goal" another="..."></slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      goals: ['Learn Vue', 'Finish the course'],
    };
  },
};
</script>
