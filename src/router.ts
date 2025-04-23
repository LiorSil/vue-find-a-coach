import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

// Create a new router instance
const router = createRouter({
  history: createWebHistory(), // Use the HTML5 history mode
  routes: [{ path: "/", component: App }],
});

// Export the router instance
export default router;
