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

// Handle GitHub Pages redirect
const l = window.location;
if (l.pathname.includes('?/')) {
  const path = l.pathname.slice(1).split('?/')[1].replace(/~and~/g, '&');
  const search = l.search.slice(1).replace(/~and~/g, '&');
  const hash = l.hash;
  const newPath = '/' + path + (search ? '?' + search : '') + hash;
  router.replace(newPath);
}

app.mount("#app");