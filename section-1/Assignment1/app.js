const app = Vue.createApp({
  data() {
    return {
      age: 10,
      name: 'team',
      imageUrl: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/04/24/568532-ronaldo-getty-barcelona.jpg',
      inputValue: 'This is my input value.'
    }
  },
  methods: {
    agePlusFive() {
      return this.age + 5;
    },
    randomNumber() {
      return Math.random();
    }
  }
})

app.mount('#assignment')