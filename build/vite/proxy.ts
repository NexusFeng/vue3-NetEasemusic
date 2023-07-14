import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>


export function createProxy(env) {
  const ret: ProxyTargetList = {
    '/netease-api': {
      target: env.VITE_BASE_URL,
      rewrite: (path) => path.replace(/^\/netease-api/, ''),
      changeOrigin: true,
      secure: false,
    }
  }
  return ret
}