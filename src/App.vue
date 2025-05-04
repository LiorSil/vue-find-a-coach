<template>
  <header>
    <nav class="nav-bar ">
      <FlowBite />
     

      <nav class="nav-links">
        <router-link to="/">All Coaches</router-link> |
        <router-link to="/requests">Requests</router-link>
        <button class="theme-toggle" @click="toggleTheme">
          <span v-if="isDarkMode">🌞</span>
          <span v-else>🌙</span>
        </button>
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
import lightBackground from './assets/light-mode-background.png';
import darkBackground from './assets/dark-mode-background.png';


export default defineComponent({
  name: "App",
  components: {
    FlowBite,
  },
  data() {
    return {
      isDarkMode: false,
      lightBackground,
      darkBackground,
    };
  },

  methods: {
    ...mapActions("Request", ["fetchRequests"]),
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      const theme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.body.style.backgroundImage = `url(${this.isDarkMode ? this.darkBackground : this.lightBackground})`;
      localStorage.setItem('theme', theme);
    },
  },
  mounted() {
    this.fetchRequests();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.body.style.backgroundImage = `url(${this.isDarkMode ? this.darkBackground : this.lightBackground})`;
    }
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


:root {
  --background-image: url("./assets/light-mode-background.png");
  --text-color: #333;
  --bg-color: #ffffff;
  --header-bg: #3d008d;
  --link-color: #f391e3;
  --link-hover-border: #f391e3;
}

[data-theme="dark"] {
  --background-image: url("./assets/dark-mode-background.png");
  --text-color: #ffffff;
  --bg-color: #1a1a1a;
  --header-bg: #2d0066;
  --link-color: #ff9ef0;
  --link-hover-border: #ff9ef0;
}

header {
  width: 100%;
  height: 5rem;
  background-color: var(--header-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

header a {
  text-decoration: none;
  color: var(--link-color);
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid var(--link-hover-border);
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
  width: 100%;
  margin: auto;
  margin-right: 1rem;
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
  background-image: var(--background-image);
  background-repeat: repeat;
  background-attachment: fixed;
  min-height: 100vh;
  color: var(--text-color);
  background-color: var(--bg-color);
  transition: all 0.3s ease;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  margin-left: 1rem;
  transition: transform 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

body {
  margin: 0;
  padding: 0;
  color: var(--text-color);
  background-color: var(--bg-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
