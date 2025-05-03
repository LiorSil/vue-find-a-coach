<template>
  <div class=" mx-auto">
    <div
      :key="professions.map((p) => p.selected).join(',')"
      class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
        Filter by Profession
      </h3>
      <ul
        class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >  
          <li
            v-for="profession in professions"
            :key="profession.id"
            class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
          >
            <div class="flex items-center  ps-3">
              <input
                :id="profession.name.toLowerCase() + '-checkbox-list'"
                type="checkbox"
                :checked="profession.selected"
                @change="toggleProfession(profession)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                :for="profession.name.toLowerCase() + '-checkbox-list'"
                class="w-full py-3 ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >{{ profession.name }}</label
              >
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Profession } from "../../store/types";

export default defineComponent({
  name: "CoachesFilter",
  props: {
    professions: {
      type: Array as PropType<Profession[]>,
      required: true,
    },
  },
  emits: ["filter-professions"],
  methods: {
    toggleProfession(profession: Profession) {
      profession.selected = !profession.selected;
      this.$emit("filter-professions", this.professions);
    },
  },
});
</script>

