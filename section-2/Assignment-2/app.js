const app = Vue.createApp({
  data() {
    return {
      input1: '',
      confirmedInput: '',
    };
  },
  methods: {
    showAlert() {
      alert('Welcome~~~');
    },
    handleInput1(event) {
      console.log('keydown ===>')
      this.input1 = event.target.value;
    },
    handleInput2(event) {
      this.confirmedInput = this.input1;
    },
  },
});

app.mount('#assignment');
