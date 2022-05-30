<template>
  <div>
    <base-dialog
      v-if="inputIsInvalid"
      title="Invalid input"
      @close="closeAlertDialog"
    >
      <template #default>
        <p>Unfortunately, at least one input value is invalid.</p>
        <p>Please check your input</p>
      </template>
      <template #action>
        <base-button @click="closeAlertDialog">Okay</base-button>
      </template>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitData">
        <div class="form-control">
          <label for="title">Title</label>
          <input id="title" name="title" type="text" ref="titleInput" />
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            ref="descriptionInput"
          ></textarea>
        </div>
        <div class="form-control">
          <label for="link">Link</label>
          <input id="link" name="link" type="url" ref="linkInput" />
        </div>
        <div><base-button type="submit">Add Resource</base-button></div>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  components: { BaseButton },
  inject: ['addResource'],
  data() {
    return {
      inputIsInvalid: false,
    };
  },
  methods: {
    submitData() {
      const title = this.$ref.titleInput.value;
      const description = this.$ref.descriptioninput.value;
      const link = this.$ref.linkInput.value;

      if (
        title.trim() === '' ||
        description.trim() === '' ||
        link.trim() === ''
      ) {
        this.inputIsInvalid = true;
      }

      this.addRecource({ title, description, link });
    },
    closeAlertDialog() {
      this.inputIsInvalid = false;
    },
  },
};
</script>

<style scoped>
/* paste */
</style>
