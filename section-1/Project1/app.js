const app = Vue.createApp({
  data() {
    return {
      finalGoal: 'Master Vue',
      courseGoal1: 'Finish the countse and learn Vue!',
      courseGoal2: 'Finish the countse and learn Vue!',

      vueLink: 'https://vuejs.org/'
    }
  },
  methods: {
    outputGoalUsingStaticData() {
      const randomNubmer = Math.random();
      if (randomNubmer < 0.5) {
        return 'Learn Vue.'
      }
      else {
        return 'review Vue.'
      }
    },
    outputGoalUsingSelfData() {
      const randomNubmer = Math.random();
      if (randomNubmer < 0.5) {
        return this.courseGoal1
      }
      else {
        return this.courseGoal2
      }
    }
  }
});

app.mount('#user-goal');