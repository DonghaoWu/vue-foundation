const app = Vue.createApp({
  data() {
    return {
      enteredGoal: '',
      goals: [],
      objectExample: {},
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredGoal);
      this.enteredGoal = '';
    },
    removeGoal(index) {
      this.goals.splice(index, 1);
    },
  },
});

app.mount('#user-goals');
