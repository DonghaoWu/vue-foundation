<template>
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
</template>

<script>
export default {
  inject: ['addResource'],
  data() {},
  methods: {
    submitData() {
      const title = this.$ref.titleInput.value;
      const description = this.$ref.descriptioninput.value;
      const link = this.$ref.linkInput.value;

      this.addRecource({ title, description, link });
    },
  },
};
</script>

<style scoped>
/* paste */
</style>
