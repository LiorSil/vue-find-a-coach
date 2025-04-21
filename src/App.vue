<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "./components/layout/AppLayout.vue";

export default defineComponent({
  components: {
    AppLayout,
  },
});
</script>

<style scoped></style>
