/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    server: {
      open: true,
      host: '0.0.0.0',
      proxy: {
        '/netease-api': {
          target: env.VITE_BASE_URL,
          rewrite: (path) => path.replace(/^\/netease-api/, ''),
          changeOrigin: true,
          secure: false,
        },
      }
    },
    plugins: [
      Vue({
        include: [/\.vue$/],
      }),
      Pages({
        extensions: ['vue'],
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'home'
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/store',
        ],
        vueTemplate: true,
      }),

      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts',
      }),
      Unocss(),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),
      Inspect(),
    ],
    test: {
      include: ['**/__test__/**/*.test.ts'],
      environment: 'jsdom',
    },
  }
})