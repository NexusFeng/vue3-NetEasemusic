import type { App, ObjectDirective } from 'vue'

const LazyLoadDirective: ObjectDirective = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], self: IntersectionObserver) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            const { target } = entry
            const src = (target as HTMLElement).dataset.src
            if (src) {
              (target as HTMLImageElement).src = src;
              (target as HTMLElement).removeAttribute('data-src')
              self.unobserve(target)
            }
          }
        })
      },
    )
    observer.observe(el as HTMLElement)
  },
}

export const install = (app: App) => {
  app.directive('lazy', LazyLoadDirective)
}
