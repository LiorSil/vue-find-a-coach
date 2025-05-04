<template>
  <div class="mx-auto w-full md:w-4/5">
    <div
      :key="professions.map((p) => p.selected).join(',')"
      class="block p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full" 
      
    >
      <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white break-words">
        Filter by Profession
      </h3>
      <ul
        class=" items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex flex-row dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <li
          v-for="profession in professions"
          :key="profession.id"
          class="w-full border-b border-gray-200 last:border-b-0 md:border-b-0 md:border-r last:border-r-0 dark:border-gray-600"
        >
          <div class="flex items-center justify-center sm:justify-start ps-3">
            <input
              :id="profession.name.toLowerCase() + '-checkbox-list'"
              type="checkbox"
              :checked="profession.selected"
              @change="toggleProfession(profession)"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              :for="profession.name.toLowerCase() + '-checkbox-list'"
              class="w-full py-3 ms-2 font-medium text-gray-900 dark:text-gray-300 break-words text-center sm:text-left"
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
