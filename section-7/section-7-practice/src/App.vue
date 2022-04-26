<template>
  <div class="main">
    <header>
      <h2>Section-7-practice</h2>
    </header>
    <section class="card-container">
      <active-user
        class="card"
        :username="enteredName"
        :age="enteredAge"
      ></active-user>
      <user-data class="card" @handle-change="handleChange"></user-data>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredName: '',
      enteredAge: '',
    };
  },
  methods: {
    handleChange({ username, age }) {
      this.enteredName = username;
      this.enteredAge = age;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: 'Jost', sans-serif;
}
body {
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main {
  margin-top: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  margin-top: 3rem;
  display: flex;
}

.card {
  width: 400px;
  height: 400px;
  margin: 1rem;
  border: 5px solid grey;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
