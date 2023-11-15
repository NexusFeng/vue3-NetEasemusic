<script lang="ts" setup>
// import { carouselEmits } from './slide'
import { useSlide } from './use-slide'

const props = defineProps({
  height: {
    type: String,
    default: '',
  },
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
})
// const isNumber = (val: any): val is number => typeof val === 'number'
// const carouselEmits = {
//   change: (current: number, prev: number) => [current, prev].every(isNumber),
// }
// const emit = defineEmits(carouselEmits)

defineOptions({
  name: 'slide',
})

const {
  root,
  activeIndex,
  hover,
  items,
  containerStyle,
  handleButtonEnter,
  handleButtonLeave,
  handleIndicatorClick,
  handleMouseEnter,
  handleMouseLeave,
  setActiveItem,
  prev,
  next,
  throttledArrowClick,
  throttledIndicatorHover,
} = useSlide(props)

defineExpose({
  setActiveItem,
  prev,
  next,
})
</script>

<template>
  <div
    ref="root"
    class="slide"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="slide-container" :style="containerStyle">
      <transition name="carousel-arrow-left">
        <button
          v-show="hover"
          type="button"
          class="carousel-arrow carousel-arrow-left"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
        >
          <IconLeft />
        </button>
      </transition>
      <transition name="carousel-arrow-right">
        <button
          v-show="hover"
          type="button"
          class="carousel-arrow carousel-arrow-right"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
        >
          <IconRight />
        </button>
      </transition>
      <slot />
    </div>
    <ul class="slide-indicators">
      <li
        v-for="index in items.length"
        :key="index"
        class="slide-indicators-item" :class="[index === activeIndex ? 'opacity-100' : '',
        ]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <button class="slide-indicators-btn" />
      </li>
    </ul>
  </div>
</template>
