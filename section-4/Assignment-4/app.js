const app = Vue.createApp({
  data() {
    return {
      userInput: '',
      isVisible: true,
      bgc: '',
    };
  },
  computed: {
    inputAndToggleClasses() {
      return {
        [this.userInput]: true,
        visile: this.isVisible,
        hidden: !this.isVisible,
      };
    },
  },
  methods: {
    handleToggle() {
      this.isVisible = !this.isVisible;
    },
  },
});

app.mount('#assignment');
