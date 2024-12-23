<template>
  <header>
    <nav>
      <span>Task Manager</span>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
header nav {
  display: flex;
  justify-content: space-between;
  background-color: #007BFF;
  color: white;
  padding: 10px;
}
</style>
