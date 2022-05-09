<template>
  <div>
    <h2>Manage Goal</h2>
    <input type="text" ref="goal" />
    <button @click="setGoal">Set Goal</button>
    <teleport to="#app">
      <my-error-alert v-if="inputIsInvalid">
        <h2>Input is invalid.</h2>
        <p>Please input something.</p>
        <button @click="confirmError">Got it</button>
      </my-error-alert>
    </teleport>
  </div>
</template>

<script>
import MyErrorAlert from './MyErrorAlert.vue';
export default {
  components: {
    MyErrorAlert,
  },
  data() {
    return {
      inputIsInvalid: false,
    };
  },
  methods: {
    setGoal() {
      const enteredValue = this.$refs.goal.value;
      if (enteredValue === '') {
        this.inputIsInvalid = true;
      }
    },
    confirmError() {
      this.inputIsInvalid = false;
    },
  },
};
</script>
