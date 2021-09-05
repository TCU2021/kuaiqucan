import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";

export default {
  alias: {
    '@': '/src',
    '@views': '/src/views'
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
};
