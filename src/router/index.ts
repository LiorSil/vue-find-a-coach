import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Define your routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
  //  component: () => import('@/views/Home.vue'), // Lazy-loaded
  },
  {
    path: '/about',
    name: 'About',
//     component: () => import('@/views/About.vue'), // Lazy-loaded
  },
];

// Create the router instance
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;