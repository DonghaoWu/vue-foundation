const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      num: 2,
      lastName: 'Wu',
      name: '',
      fullname: '',
      confirmedName: '',
    };
  },
  methods: {
    add() {
      this.counter = this.counter + 2;
    },
    addWithParam(num) {
      this.counter = this.counter + num;
    },
    setName(e) {
      this.name = e.target.value;
    },
    setFullname(e, lastname) {
      this.fullname = e.target.value + ' ' + lastname;
    },
    confirmInput() {
      this.confirmedName = this.fullname;
    },
    submitForm() {
      alert('Hello');
    },
  },
});
app.mount('#events');
