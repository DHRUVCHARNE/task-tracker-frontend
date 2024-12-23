<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <button @click="onComplete" :disabled="task.completed">
      {{ task.completed ? 'Completed' : 'Mark Complete' }}
    </button>
    <button @click="onDelete">Delete</button>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    onComplete() {
      this.$emit('complete', this.task._id);
    },
    onDelete() {
      this.$emit('delete', this.task._id);
    },
  },
};
</script>

<style scoped>
.task-card {
  padding: 15px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  font-size: 14px;
}

button:disabled {
  background-color: #ccc;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
