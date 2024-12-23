<template>
  <div>
    <Header />
    <header-nav />
    <div class="task-container">
      <h1>Your Tasks</h1>

      <!-- Loading State Indicator -->
      <div v-if="isLoading" class="loading">Loading tasks...</div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

      <!-- Task List -->
      <div v-for="task in tasks" :key="task._id" class="task">
        <TaskCard 
          :task="task" 
          @complete="markComplete" 
          @delete="deleteTask" 
        />
      </div>

      <!-- Add Task Form -->
      <form @submit.prevent="createTask" class="task-form">
        <input 
          v-model="title" 
          placeholder="Task Title" 
          required
          :class="{ 'input-error': !title && formSubmitted }"
        />
        <textarea 
          v-model="description" 
          placeholder="Task Description"
          :class="{ 'input-error': !description && formSubmitted }"
        ></textarea>
        <button type="submit">Add Task</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import TaskCard from '@/components/TaskCard.vue';

export default {
  components: {
    Header,
    TaskCard,
  },
  data() {
    return {
      title: '',
      description: '',
      isLoading: false,
      errorMessage: '',
      formSubmitted: false,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    async fetchTasks() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('fetchTasks');
        
      } catch (error) {
        this.errorMessage = 'Failed to load tasks. Please try again later.';
        alert('Failed to load tasks. Please try again later.');
        console.error(error);
        this.$router.push('/login');
      } finally {
        this.isLoading = false;
      }
    },
    createTask() {
      this.formSubmitted = true;

      if (this.title && this.description) {
        this.$store.dispatch('createTask', {
          title: this.title,
          description: this.description,
        });
        this.title = '';
        this.description = '';
        this.formSubmitted = false;
      }
    },
    deleteTask(taskId) {
      this.$store.dispatch('deleteTask', taskId);
    },
    markComplete(taskId) {
      this.$store.dispatch('markTaskComplete', taskId);
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.task-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 10px;
}

.task {
  margin-bottom: 20px;
}

.loading {
  font-size: 18px;
  color: #007bff;
}

.error {
  color: red;
  font-size: 18px;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
}

.task-form input,
.task-form textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.task-form button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-form .input-error {
  border-color: red;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
