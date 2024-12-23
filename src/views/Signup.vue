<template>
  <div class="auth-container">
    <h1>Signup</h1>
    <form @submit.prevent="signup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="passwordConfirm" type="password" placeholder="Confirm Password" required />
      <button type="submit">Signup</button>

    </form>
    <router-link to="/login">Already have an account? Login</router-link>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    async signup() {
      try {
        if (this.password !== this.passwordConfirm) {
          alert('Passwords do not match');
          return;
        }
        await this.$store.dispatch('signup', { email: this.email, password: this.password });
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
        alert('Signup failed', error.message);


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
