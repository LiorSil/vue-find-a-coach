<template>
  <div>
    <h1>
      Coach Details
    </h1>

  </div>
</template>

<script>
  export default {
    name: 'CoachDetail',
    props: {
      coach: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // Define any local state here if needed
      };
    },
    methods: {
      // Define any methods here if needed
    }
  }
</script>

<style scoped>

</style>