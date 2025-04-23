<template>
  <CoachesFilter> </CoachesFilter>
  <CoachesList></CoachesList>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CoachesFilter from "./CoachesFilter.vue";
import CoachesList from "./CoachesList.vue";

export default defineComponent({
  components: {
    CoachesFilter,
    CoachesList,
  },
  data() {
    return{}
  },
});
</script>

<style scoped></style>
