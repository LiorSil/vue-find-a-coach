import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vueDevTools from "vite-plugin-vue-devtools";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_URL,
    plugins: [vue(), tailwindcss(), vueDevTools(), createHtmlPlugin({})],
    define: {},
  };
});
