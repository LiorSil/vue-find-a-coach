import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import AppLayout from "./components/layout/AppLayout.vue";

// Create a new router instance
const router = createRouter({
  history: createWebHistory(), // Use the HTML5 history mode
  routes: [{ path: "/", component: AppLayout }],
});

// Export the router instance
export default router;
