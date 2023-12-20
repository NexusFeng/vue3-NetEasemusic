<script lang="ts" setup>
import { computed, unref } from 'vue'
import type { CSSProperties } from 'vue'
import { useCarouselItem } from './use-carousel-item'

const props = defineProps({
  name: { type: String, default: '' },
  label: {
    type: [String, Number],
    default: '',
  },
})

defineOptions({
  name: 'CarouselItem',
})

// inject
const {
  carouselItemRef,
  active,
  translate,
  scale,
  ready,
  inStage,
  handleItemClick,
} = useCarouselItem(props)

const carouselItemClass = computed(() => ({
  'carousel-item': true,
  'carousel-item-active': active.value,
  'in-stage': inStage.value && !active.value,
}))

const itemStyle = computed<CSSProperties>(() => {
  const _translate = `translateX(${unref(translate)}px)`
  const _scale = `scale(${unref(scale)})`
  const transform = [_translate, _scale].join(' ')
  return {
    transform,
  }
})
</script>

<template>
  <div
    v-show="ready"
    ref="carouselItemRef"
    :class="carouselItemClass"
    :style="itemStyle"
    @click="handleItemClick"
  >
    <div v-show="!active" class="carousel-item-mask" />
    <slot />
  </div>
</template>

<style>
@import url('./index.css');
</style>
