import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vueDevTools from "vite-plugin-vue-devtools";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  return {
    base: "/find-a-coach/",
    plugins: [vue(), tailwindcss(), vueDevTools(), createHtmlPlugin({})],
    define: {},
  };
});
