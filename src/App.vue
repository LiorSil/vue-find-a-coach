<template>
  <header>
    <nav class="nav-bar">
      <FlowBite />
     

      <nav class="nav-links">
        <router-link to="/">All Coaches</router-link> |
        <router-link to="/requests">Requests</router-link>
      </nav>
    </nav>
  </header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import FlowBite from "./components/layout/FlowBite.vue";

export default defineComponent({
  name: "App",
  components: {
    FlowBite,
  },
  methods: {
    ...mapActions("Request", ["fetchRequests"]),
  },
  mounted() {
    this.fetchRequests();
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
  background-image: var(--background-image);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

:root {
  --background-image: url("@/assets/light-mode-background.png");
}

[data-theme="dark"] {
  --background-image: url("@/assets/dark-mode-background.png");
}

header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

.nav-bar {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

header li {
  margin: 0 0.5rem;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
#app {
  background-image: url("./assets/light-mode-background.png");
  background-size: cover; /* or `contain`, `repeat` etc. */
  background-repeat: repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
