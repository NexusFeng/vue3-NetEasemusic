<script lang="ts" setup>
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pagerCount: {
    type: Number,
    default: 7,
  },
})
const showPrevMore = ref(false)
const showNextMore = ref(false)
const quickPrevHover = ref(false)
const quickNextHover = ref(false)

const pages = computed(() => {
  const pagerCount = props.pagerCount
  const halfPagerCount = (pagerCount - 1) / 2
  const currentPage = Number(props.currentPage)
  const pageCount = Number(props.total)
  let showPrevMore = false
  let showNextMore = false
  if (pageCount > pagerCount) {
    if (currentPage > pagerCount - halfPagerCount)
      showPrevMore = true

    if (currentPage < pageCount - halfPagerCount)
      showNextMore = true
  }
  const array: number[] = []
  if (showPrevMore && !showNextMore) {
    const startPage = pageCount - (pagerCount - 2)
    for (let i = startPage; i < pageCount; i++)
      array.push(i)
  }
  else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < pagerCount; i++)
      array.push(i)
  }
  else if (showPrevMore && showNextMore) {
    const offset = Math.floor(pagerCount / 2) - 1
    for (let i = currentPage - offset; i <= currentPage + offset; i++)
      array.push(i)
  }
  else {
    for (let i = 2; i < pageCount; i++)
      array.push(i)
  }
  return array
})

watchEffect(() => {
  const halfPagerCount = (props.pagerCount - 1) / 2
  showPrevMore.value = false
  showNextMore.value = false
  if (props.total! > props.pagerCount) {
    if (props.currentPage > props.pagerCount - halfPagerCount)
      showPrevMore.value = true

    if (props.currentPage < props.total! - halfPagerCount)
      showNextMore.value = true
  }
})
</script>

<template>
  <ul v-if="total > 0" class="flex text-[14px] items-center h-[32px] font-bold text-var(--pagination-color)">
    <li class="defaultStyle">
      <IconLeft />
    </li>
    <li class="defaultStyle">
      1
    </li>
    <li v-if="showPrevMore" class="defaultStyle" @mouseenter="quickPrevHover = true" @mouseleave="quickPrevHover = false">
      <IconDoubleLeft v-if="quickPrevHover" class="defaultStyle" />
      <IconMore v-else />
    </li>
    <li v-for="page in pages" :key="page" class="defaultStyle">
      {{ page }}
    </li>
    <li v-if="showNextMore" class="defaultStyle" @mouseenter="quickNextHover = true" @mouseleave="quickNextHover = false">
      <IconDoubleRight v-if="quickNextHover" class="defaultStyle" />
      <IconMore v-else />
    </li>
    <li class="defaultStyle">
      {{ total }}
    </li>
    <li class="defaultStyle">
      <IconRight />
    </li>
  </ul>
</template>

<style scoped>
.defaultStyle {
  @apply w-[32px] cursor-pointer hover:text-var(--theme-color)
}
</style>
