import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from "./components/coaches/CoachDetail.vue";
import CoachesPage from "./components/coaches/CoachesPage.vue";

// Create a new router instance
const router = createRouter({
  history: createWebHistory(), // Use the HTML5 history mode
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      component: CoachesPage,
    },
    {
      path: "/coaches/:id",
      name: "coach-detail",
      component: CoachDetail,
      props: true,
    },
  ],
});

// Export the router instance
export default router;
