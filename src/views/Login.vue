<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <router-link to="/signup">Don't have an account? Signup</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$store.dispatch('fetchTasks');
     

        this.$router.push('/tasks');
      } catch(error) {
        alert('Invalid credentials', error.message);
        this.$store.dispatch('logout');


      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}
</style>
