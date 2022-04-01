const app = Vue.createApp({
  data() {
    return {
      name: '',
      lastName: '',
      fullname: '',
    };
  },
  watch: {
    name(value) {
      this.fullname = value + ' ' + this.lastName;
    },
    lastName(value) {
      this.fullname = this.name + ' ' + value;
    },
  },
  computed: {
    outputFullname() {
      return this.name + ' ' + this.lastName;
    },
  },
});

app.mount('#events');
