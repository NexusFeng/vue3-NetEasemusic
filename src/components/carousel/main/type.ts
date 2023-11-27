import type { CarouselItemProps } from '../item/type'

export interface SlideItemStates {
  hover: boolean
  translate: number
  scale: number
  active: boolean
  ready: boolean
  inStage: boolean
  animating: boolean
}

export interface ItemContext {
  props: CarouselItemProps
  states: SlideItemStates
  uid: number
  translateItem: (index: number, activeIndex: number, oldIndex?: number) => void
}

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

export interface CarouselContext {
  root: Ref<HTMLElement | undefined>
  items: Ref<CarouselItemContext[]>
  loop: boolean
  addItem: (item: CarouselItemContext) => void
  removeItem: (uid: number) => void
  setActiveItem: (index: number) => void
}

export const carouselEmits = {
  change: (current: number, prev: number) => [current, prev].every((val: any): val is number => typeof val === 'number'),
}

export type CarouselEmits = typeof carouselEmits
