<template>
  <div class="pl-4 flex items-center gap-2">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      class="h-8"
      alt="Flowbite Logo"
    />
    <span
      class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
      >Flowbite</span
    >
  </div>
</template>

<script>
import { initFlowbite } from "flowbite";

export default {
  name: "FlowBite",
  mounted() {
    initFlowbite();
  },
  emits: ["select-component"],
  data() {
    return {
      baseLinkClass: "block py-2 px-3 md:p-0 rounded-sm",
      activeLinkClass:
        "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500",
      inactiveLinkClass:
        "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent",
    };
  },
  props: {
    selectedComponent: {
      required: false,
    },
  },
  methods: {
    handleComponentSelection(componentName) {
      this.$emit("select-component", componentName);
    },

    getLinkClasses(linkPageName) {
      const isActive = this.selectedComponent === linkPageName;
      return [
        this.baseLinkClass,
        isActive ? this.activeLinkClass : this.inactiveLinkClass,
      ];
    },
  },
};
</script>

<style lang="postcss" scoped></style>
