import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from "./components/coaches/CoachDetail.vue";
import CoachesPage from "./components/coaches/CoachesPage.vue";
import RequestsPage from "./components/requests/RequestsPage.vue";

// Create a new router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), 
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
    {
      path: "/requests",
      component: RequestsPage,
    },
  ],
});

// Export the router instance
export default router;
