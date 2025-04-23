<template>
  <div>
    <NavBar
      @select-component="handleComponentSelection"
      :selectedComponent="selectedComponent"
    />
    <component :is="selectedComponent" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/layout/NavBar.vue";
import { RouterView } from "vue-router";
import CoachesPage from "./components/coaches/CoachesPage.vue";
import RequestsPage from "./components/requests/RequestsPage.vue";

type ComponentName = "CoachesPage" | "RequestsPage";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    RouterView,
    CoachesPage,
    RequestsPage,
  },
  data() {
    return {
      selectedComponent: "CoachesPage" as ComponentName,
    };
  },
  methods: {
    handleComponentSelection(componentName: ComponentName) {
      this.selectedComponent = componentName;
    },
  },
});
</script>

<style scoped></style>
