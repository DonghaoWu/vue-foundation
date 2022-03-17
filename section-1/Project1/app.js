const app = Vue.createApp({
  data() {
    return {
      finalGoal: 'Master Vue',
      courseGoal1: 'Finish the countse and learn Vue!',
      courseGoal2: 'Finish the countse and learn Vue!',
      htmlGoal: '<h2>This is a html goal.</h2>',
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