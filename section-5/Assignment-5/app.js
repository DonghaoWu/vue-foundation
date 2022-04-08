const app = Vue.createApp({
  data() {
    return {
      inputTask: '',
      list: [],
      isListVisible: true,
    };
  },
  computed: {
    buttonCaption() {
      return this.isListVisible ? 'Hide List' : 'Show List';
    },
  },
  methods: {
    addTask() {
      this.list.push(this.inputTask);
      this.inputTask = '';
    },
    toggleList() {
      this.isListVisible = !this.isListVisible;
    },
  },
});

app.mount('#assignment');
