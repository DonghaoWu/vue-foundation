<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name</label>
      <input type="text" v-model="inputedName" />
    </div>
    <div>
      <label>Phone</label>
      <input type="tel" v-model="inputedPhone" />
    </div>
    <div>
      <label>Email</label>
      <input type="email" v-model="inputedEmail" />
    </div>
    <div>
      <button>Add Contact</button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['add-contact'],
  data() {
    return {
      inputedName: '',
      inputedPhone: '',
      inputedEmail: '',
    };
  },
  methods: {
    handleSubmit() {
      this.$emit(
        'add-contact',
        this.inputedName,
        this.inputedPhone,
        this.inputedEmail
      );
    },
  },
};
</script>
