import { createApp } from "vue";
import App from "./App.vue";
import CoachCard from "./components/coaches/CoachCard.vue";
import store from "./store";
import router from "./router.ts"; // Import the router
import AppLayout from "./components/layout/AppLayout.vue";
const app = createApp(App);

app.component("AppLayout", AppLayout); // Register the AppLayout component globally
app.component("CoachCard", CoachCard); // Register the CoachCard component globally

app.use(router); // Use the router
app.use(store); // Use the store

app.mount("#app");
