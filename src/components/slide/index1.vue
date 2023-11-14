<script lang="ts" setup>
import { carouselEmits, carouselProps } from './silde'
import { useSlide } from './use-slide'

const props = defineProps(carouselProps)

const emit = defineEmits(carouselEmits)

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
  PlaceholderItem,
  throttledArrowClick,
  throttledIndicatorHover,
} = useSlide(props, emit)

defineExpose({
  /** @description manually switch slide */
  setActiveItem,
  /** @description switch to the previous slide */
  prev,
  /** @description switch to the next slide */
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
      <PlaceholderItem />
      <slot />
    </div>
    <ul class="slide-indicators">
      <li
        v-for="(item, index) in items"
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
