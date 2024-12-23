<template>
  <div v-if="message" class="notification">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: ['message'],
};
</script>

<style>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007BFF;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
