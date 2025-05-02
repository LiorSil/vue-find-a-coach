<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <RequestItem
      v-for="request in requests"
      :key="request.id"
      :id="request.id"
      :firstname="request.firstname"
      :lastname="request.lastname"
      :email="request.email"
      :formatted-date="request.formattedDate"
      :message="request.message"
      :requested-by="request.requestedBy"
    />
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import RequestItem from "./RequestItem.vue";

export default defineComponent({
  name: "RequestList",
  components: {
    RequestItem,
  },
  computed: {
    ...mapGetters("Request", ["requests"]),
  },
});
</script>

<style scoped>
/* Add smooth transitions for grid items */
.grid {
  perspective: 1000px;
}

.grid > * {
  transition: all 0.3s ease;
  backface-visibility: hidden;
}

</style>
