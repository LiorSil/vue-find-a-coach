<template>
  <MasonryWall :items="requests" :column-width="300" :gap="5">
    <template #default="{ item }">
      <RequestItem
        
        :key="item.id"
        :id="item.id"
        :firstname="item.firstname"
        :lastname="item.lastname"
        :email="item.email"
        :formatted-date="item.formattedDate"
        :message="item.message"
        :requested-by="item.requestedBy"
      />
    </template>
  </MasonryWall>
</template>

<script>
import { mapGetters } from "vuex";
import RequestItem from "./RequestItem.vue";
import MasonryWall from "@yeger/vue-masonry-wall";

export default {
  name: "RequestList",
  components: {
    RequestItem,
  },
  computed: {
    ...mapGetters("Request", ["requests"]),
  },
};
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
