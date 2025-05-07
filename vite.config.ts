import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vueDevTools from "vite-plugin-vue-devtools";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_URL,
    plugins: [
      vue(),
      tailwindcss(),
      vueDevTools(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: "Find a Coach",
            description: "Find the perfect coach for your needs",
          },
        },
      }),
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 10240, // Only compress files larger than 10kb
        deleteOriginFile: false,
      }),
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 10240,
        deleteOriginFile: false,
      }),
    ],
    define: {},
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info"],
          passes: 2,
        },
        format: {
          comments: false,
        },
      },
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue", "vue-router", "vuex"],
            firebase: ["firebase/app", "firebase/firestore"],
            ui: ["@yeger/vue-masonry-wall"],
          },
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
      sourcemap: mode === "development",
      cssCodeSplit: true,
      reportCompressedSize: false,
      target: "es2015",
    },
    optimizeDeps: {
      include: ["vue", "vue-router", "vuex", "@yeger/vue-masonry-wall"],
      exclude: ["firebase"],
    },
  };
});
