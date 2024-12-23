import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/main.css';

const app = createApp(App);

app.use(router); // Use the router
app.use(store);  // Use the Vuex store (if using Vuex 4)
app.mount('#app'); // Mount the app to the DOM
