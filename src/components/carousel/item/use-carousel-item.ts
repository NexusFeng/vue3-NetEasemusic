import {
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  unref,
} from 'vue'
import { carouselContextKey } from '../main/use-carousel'

import type { CarouselItemProps } from './type'

export const useCarouselItem = (props: CarouselItemProps) => {
  const carouselContext = inject(carouselContextKey)!
  const instance = getCurrentInstance()!
  const CARD_SCALE = 0.83

  const carouselItemRef = ref<HTMLElement>()
  const hover = ref(false)
  const translate = ref(0)
  const scale = ref(1)
  const active = ref(false)
  const ready = ref(false)
  const inStage = ref(false)
  const animating = ref(false)

  function processIndex(index: number, activeIndex: number, length: number) {
    const lastItemIndex = length - 1
    const prevItemIndex = activeIndex - 1
    const nextItemIndex = activeIndex + 1
    const halfItemIndex = length / 2

    if (activeIndex === 0 && index === lastItemIndex)
      return -1
    else if (activeIndex === lastItemIndex && index === 0)
      return length
    else if (index < prevItemIndex && activeIndex - index >= halfItemIndex)
      return length + 1
    else if (index > nextItemIndex && index - activeIndex >= halfItemIndex)
      return -2

    return index
  }

  function calcCardTranslate(index: number, activeIndex: number) {
    const parentWidth = carouselContext.root.value?.offsetWidth || 0
    if (inStage.value)
      return (parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1)) / 4
    else if (index < activeIndex)
      return (-(1 + CARD_SCALE) * parentWidth) / 4
    else
      return ((3 + CARD_SCALE) * parentWidth) / 4
  }

  const translateItem = (
    index: number,
    activeIndex: number,
  ) => {
    const carouselItemLength = carouselContext.items.value.length ?? Number.NaN

    const isActive = index === activeIndex
    if (!isActive && carouselItemLength > 2)
      index = processIndex(index, activeIndex, carouselItemLength)
    active.value = isActive
    inStage.value = Math.round(Math.abs(index - activeIndex)) <= 1
    translate.value = calcCardTranslate(index, activeIndex)
    scale.value = unref(active) ? 1 : CARD_SCALE
    ready.value = true
  }

  function handleItemClick() {
    const index = carouselContext.items.value.findIndex(
      ({ uid }) => uid === instance.uid,
    )
    carouselContext.setActiveItem(index)
  }

  onMounted(() => {
    carouselContext.addItem({
      props,
      states: reactive({
        hover,
        translate,
        scale,
        active,
        ready,
        inStage,
        animating,
      }),
      uid: instance.uid,
      translateItem,
    })
  })

  onUnmounted(() => {
    carouselContext.removeItem(instance.uid)
  })

  return {
    carouselItemRef,
    active,
    animating,
    hover,
    inStage,
    translate,
    scale,
    ready,
    handleItemClick,
  }
}
