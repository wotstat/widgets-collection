import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";
import { alert } from "@mdit/plugin-alert";
import { attrs } from "@mdit/plugin-attrs";
import { container } from "@mdit/plugin-container";
import { align } from "@mdit/plugin-align";
import MarkdownIt from "markdown-it";
import { releaseNotesPlugin } from "./releaseNotes";
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader({
      svgoConfig: {
        plugins: [
          'removeDimensions'
        ]
      }
    }),
    mdPlugin({
      mode: [Mode.VUE],
      markdownIt: new MarkdownIt({
        html: true,
      })
        .use(alert)
        .use(attrs)
        .use(container)
        .use(align)
    }),
    releaseNotesPlugin()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  }
})
