import { throttle } from 'lodash-es'

export const remBase = 14

// let htmlFontSize;

export const ResizeListener = (): void => {
  const calc = () => {
    const maxFontSize = 18
    const minFontSize = 14
    const html = document.getElementsByTagName('html')[0]
    const width = html.clientWidth
    let size = remBase * (width / 1440)
    size = Math.min(maxFontSize, size)
    size = Math.max(minFontSize, size)
    html.style.fontSize = `${size}px`
    // htmlFontSize = size
  }
  calc()
  window.addEventListener('resize', throttle(calc, 500))
}
