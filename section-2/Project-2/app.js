const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      num: 2,
      name: '',
      lastName: 'Wu',
      fullname: '',
      formName: '',
      confirmedName:''
    };
  },
  methods: {
    add(num) {
      this.counter = this.counter + num;
    },
    subtract() {
      this.counter = this.counter - this.num;
    },
    setName(e) {
      this.name = e.target.value;
    },
    setFullname(e, lastname) {
      this.fullname = e.target.value + ' ' + lastname;
    },
    submitForm() {
      alert('Hello~~~');
    },
    confirmInput(){
      this.confirmedName = this.fullname
    }
  },
});

app.mount('#events');
