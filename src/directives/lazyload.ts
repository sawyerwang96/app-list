import type { DirectiveBinding } from "vue"

export const vLazyLoad = {
  mounted(el: HTMLImageElement, bindings: DirectiveBinding) {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = bindings.value
        observer.unobserve(el)
        el.onerror = () => { }
      }
    })
    observer.observe(el)
  }
}
