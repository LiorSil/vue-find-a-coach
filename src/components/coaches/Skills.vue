<template>
  <div class="mb-8">
    <h4 v-if="isTitle" class="text-xl font-medium text-white mb-4">
      Expertise
    </h4>
    <div class="flex flex-wrap  gap-2">
      <span
        v-for="skill in skills"
        :key="skill"
        class="relative bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-purple-400 border border-purple-400 hover:scale-105 transition-transform duration-200"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skills",
  props: {
    skills: {
      type: Array,
      required: true,
    },
    isTitle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
