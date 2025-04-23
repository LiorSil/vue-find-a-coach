<template>
  <NavBar />
  <div>
    <RouterView>
      <AppLayout></AppLayout>
    </RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import NavBar from "./components/layout/NavBar.vue";
import { initFlowbite } from "flowbite";
import { RouterView } from "vue-router";
import AppLayout from "./components/layout/AppLayout.vue";

export default defineComponent({
  components: {
    NavBar,
    AppLayout,
  },
  mounted() {
    initFlowbite();
  },
});
</script>

<style scoped></style>
