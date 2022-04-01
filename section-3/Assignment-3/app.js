const app = Vue.createApp({
  data() {
    return {
      msg: 'hello~~~',
      counter: 0,
      timer: null,
    };
  },
  watch: {
    counter() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let that = this;
      that.timer = setTimeout(() => {
        that.counter = 0;
      }, 5000);
    },
    outputResult() {
      const that = this;
      setTimeout(() => {
        that.counter = 0;
      }, 5000);
    },
  },
  computed: {
    outputResult() {
      if (this.counter < 37) {
        return 'Not there yet!';
      } else if (this.counter > 37) {
        return 'Too much!';
      } else {
        return 37;
      }
    },
  },
  methods: {
    add(num) {
      this.counter += num;
      console.log('working', this.counter);
    },
  },
});

app.mount('#assignment');
