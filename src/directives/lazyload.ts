import type { App, DirectiveBinding } from 'vue'

const defineDirective = (app: App) => {
  app.directive('lazyload', {
    mounted(el: HTMLImageElement, bindings: DirectiveBinding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = bindings.value
          observer.unobserve(el)
          el.onerror = () => {}
        }
      })
      observer.observe(el)
    }
  })
}

export default {
  install(app: App) {
    defineDirective(app)
  }
}
