<template>
  <div class="container mx-auto px-4 py-6">
    <div class="max-w-min bg-gray-800 rounded-md w-full flex items-center mb-6 p-4">
      <h1 class="text-2xl font-semibold text-white">Requests</h1>
    </div>

    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      <p class="text-gray-300 mt-4">Loading requests...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div v-else-if="requests.length === 0" class="text-center py-8">
      <p class="text-gray-300">No requests found.</p>
    </div>

    <RequestList v-else />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import RequestList from './RequestList.vue';

export default {
  name: 'RequestsPage',
  components: {
    RequestList
  },
  computed: {
    ...mapState('Request', ['isLoading', 'error', 'requests'])
  },
  methods: {
    ...mapActions('Request', ['fetchRequests'])
  },
  created() {
    this.fetchRequests();
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>