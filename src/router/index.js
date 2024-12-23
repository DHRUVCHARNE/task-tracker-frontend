import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import TaskList from '../views/TaskList.vue';
import store from '@/store';

// Define the routes
const routes = [
  // Public routes
  { path: '/login', component: Login, meta: { requiresAuth: false } },
  { path: '/signup', component: Signup, meta: { requiresAuth: false } },

  // Protected route
  { path: '/tasks', component: TaskList, meta: { requiresAuth: true } },

  // Root path redirect based on authentication status
  {
    path: '/',
    redirect: (to) => {
      // Check if the user is authenticated
      const loggedIn = !!localStorage.getItem('token');
      // Redirect to the appropriate page based on authentication
      return loggedIn ? '/tasks' : '/login';
    },
    meta: { requiresAuth: false },
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// Add a navigation guard
router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
