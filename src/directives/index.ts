import type { App } from 'vue'

interface module {
  install: Function
}
const installDirectives = (app: App) => {
  const modulesFiles: Record<string, module> = import.meta.glob('./*.ts', { eager: true })
  const path = Object.keys(modulesFiles)
  path.forEach((item) => {
    modulesFiles[item].install(app)
  })
}
export default installDirectives
