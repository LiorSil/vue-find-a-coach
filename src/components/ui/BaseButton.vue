<template>
  <button
    :class="[
      'mx-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-4 focus:outline-none transition-all duration-200',
      colorClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

type ButtonVariant = "primary" | "success" | "danger" | "warning" | "info";

export default defineComponent({
  name: "BaseButton",
  props: {
    variant: {
      type: String as () => ButtonVariant,
      default: "primary",
      validator: (value: string) =>
        ["primary", "success", "danger", "warning", "info"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props) {
    const colorClasses = computed(() => {
      const baseClasses = {
        primary:
          "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 ",
        success:
          "bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        danger:
          "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
        warning:
          "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800",
        info: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800",
      };
      return baseClasses[props.variant];
    });

    return {
      colorClasses,
    };
  },
});
</script>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>
