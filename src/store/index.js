import { createStore } from 'vuex'; // Use createStore for Vuex 4
import api from '../api';
import router from '../router';


export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    tasks: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      // Make API call to login endpoint
      const response = await api.post('/auth/login', credentials);
      if (response.statusCode === 401) {
        alert('Invalid login credentials');
        return;
        
      }
      commit('setToken', response.data.access_token);
    },
    async signup(_, credentials) {
      try {await api.post('/users/signup', credentials);
      alert('Signup successful! Please login.');}
      catch (error) {
        console.error(error);
        alert('An error occurred while signing up.', error.message);
      }
    },
    async logout({ commit }) {
      commit('clearToken');
      // Redirect to the login page
      router.push('/login');
      alert('Logout successful.');

      
    },
    async fetchTasks({ commit }) {
     try{ const response = await api.get('/tasks');
      if (response.statusCode === 401) {
        alert('Session expired. Please login again.', response.message);
        commit('clearToken');
        router.push('/login');
        return;
      }
      commit('setTasks', response.data);}
      catch (error) {
        console.error(error);
        alert('An error occurred while fetching tasks.', error.message);
        commit('clearToken');
        router.push('/login');

      }

    },
    async createTask({ dispatch }, task) {
      await api.post('/tasks', task);
      dispatch('fetchTasks');
    },
    async deleteTask({ dispatch }, taskId) {
      await api.delete(`/tasks/${taskId}`);
      dispatch('fetchTasks');
    },
    async markTaskComplete({ dispatch }, taskId) {
      await api.patch(`/tasks/${taskId}/complete`);
      dispatch('fetchTasks');
    },
  },
});
