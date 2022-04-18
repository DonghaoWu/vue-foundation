const app = Vue.createApp({
  data() {
    return {
      friends: [
        { id: 001, name: 'Tom', phone: '12345', email: '123@123.com' },
        { id: 002, name: 'Mary', phone: '222', email: '222@222.com' },
        { id: 003, name: 'Joe', phone: '333', email: '333@333.com' },
      ],
    };
  },
  methodes: {},
});

app.component('friend-contact', {
  props: ['friend'],
  template: `
      <li>
      <h2>{{friend.name}}</h2>
      <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show'}} Details</button>
      <ul v-if='detailsAreVisible'>
        <li><strong>Phone:</strong> {{friend.phone}}</li>
        <li><strong>Email:</strong> {{friend.email}}</li>
      </ul>
    </li>
  `,
  data() {
    return {
      detailsAreVisible: false,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
});

app.mount('#app');
