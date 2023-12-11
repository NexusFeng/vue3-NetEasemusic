<script lang="ts" setup>
import { carouselEmits } from './type'
import { useCarousel } from './use-carousel'

const props = defineProps({
  height: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(carouselEmits)

defineOptions({
  name: 'carousel',
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
} = useCarousel(props, emit)

defineExpose({
  setActiveItem,
  prev,
  next,
})
</script>

<template>
  <div
    ref="root"
    class="carousel"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="relative h-300px" :style="containerStyle">
      <transition name="carousel-arrow-left">
        <button
          v-show="hover"
          type="button"
          class="carousel-arrow left-16px"
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
          class="carousel-arrow right-16px"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
        >
          <IconRight />
        </button>
      </transition>
      <slot />
    </div>
    <ul class="carousel-indicators">
      <li
        v-for="index in items.length"
        :key="index"
        class="carousel-indicators-item" :class="[index === activeIndex ? 'opacity-100' : 'opacity-40',
        ]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <button class="carousel-indicators-btn" />
      </li>
    </ul>
  </div>
</template>

<style>
@import url('./index.css');
</style>
