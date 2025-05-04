import { createApp } from "vue";
import MasonryWall from "@yeger/vue-masonry-wall";
import App from "./App.vue";
import store from "./store";
import router from "./router.ts"; // Import the router
import BaseButton from "./components/ui/BaseButton.vue";

const app = createApp(App);

app.component("BaseButton", BaseButton);
app.use(router); // Use the router
app.use(store); // Use the store
app.use(MasonryWall);

const redirect = sessionStorage.redirect;

if (redirect) {
  sessionStorage.removeItem("redirect");
  // Wait until router resolves the redirect path before mounting the app
  router.replace(redirect).finally(() => {
    app.mount("#app");
  });
} else {
  app.mount("#app");
}