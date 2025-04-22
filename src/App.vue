<template>
  <NavBar />
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/layout/NavBar.vue";
import { initFlowbite } from 'flowbite'



export default defineComponent({
  components: {
    NavBar,
   
  },
  mounted() {
    initFlowbite()
  },
});
</script>



<style scoped></style>
