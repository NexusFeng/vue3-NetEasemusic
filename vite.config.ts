/// <reference types="vitest" />
import path from 'node:path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { createProxy }  from './build/vite/proxy'
import { createVitePlugins }  from './build/vite/plugin/index'

export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    server: {
      open: true,
      proxy: createProxy(env)
    },
    plugins: createVitePlugins(),

    test: {
      include: ['**/__test__/**/*.test.ts'],
      environment: 'jsdom',
    },
  }
}
