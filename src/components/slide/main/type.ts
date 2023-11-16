import type { SlideItemProps } from '../item/type'

export interface ItemStates {
  hover: boolean
  translate: number
  scale: number
  active: boolean
  ready: boolean
  inStage: boolean
  animating: boolean
}

export interface ItemContext {
  props: SlideItemProps
  states: SlideItemStates
  uid: number
  translateItem: (index: number, activeIndex: number, oldIndex?: number) => void
}
