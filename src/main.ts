import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router.ts"; // Import the router

const app = createApp(App);


app.use(router); // Use the router
app.use(store); // Use the store

app.mount("#app");
