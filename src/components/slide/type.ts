import type { CarouselItemProps } from './item/type'

export interface CarouselItemStates {
  hover: boolean
  translate: number
  scale: number
  active: boolean
  ready: boolean
  inStage: boolean
  animating: boolean
}

export interface CarouselItemContext {
  props: CarouselItemProps
  states: CarouselItemStates
  uid: number
  translateItem: (index: number, activeIndex: number, oldIndex?: number) => void
}
