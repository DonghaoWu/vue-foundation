<template>
  <section>
    <form @submit.prevent="submitChange">
      <div class="input-field">
        <label class="input-label">name:</label>
        <input type="text" placeholder="Your name" v-model="username" />
      </div>
      <div class="input-field">
        <label class="input-label">age:</label>
        <input type="number" placeholder="Your name" v-model="age" />
      </div>
      <button>Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  emits: ['handle-change'],
  data() {
    return {
      username: '',
      age: '',
    };
  },
  methods: {
    submitChange() {
      this.$emit('handle-change', { username: this.username, age: this.age });
    },
  },
};
</script>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.input-label {
  margin-bottom: 0.5rem;
  width: 200px;
  font-size: 1.5rem;
}

input {
  font-size: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
