const app = Vue.createApp({
  data() {
    return {
      finalGoal: 'Master Vue',
      vueLink: 'https://vuejs.org/',
      htmlGoal: '<h2>This is a html goal.</h2>',
      courseGoal1: 'Finish the course and learn Vue!',
      courseGoal2: 'Finish the course and review Vue!'
    };
  },
  methods: {
    outputGoalUsingStaticData(){
      const randomNumber = Math.random();
      if(randomNumber < 0.5){
        return 'Learn Vue.'
      }
      else{
        return 'Review Vue.'
      }
    },
    outputGoalUsingSelfData(){
      const randomNumber = Math.random();
      if(randomNumber < 0.5){
        return this.courseGoal1
      }
      else{
        return this.courseGoal2
      }
    }
  },
});

app.mount('#user-goal');