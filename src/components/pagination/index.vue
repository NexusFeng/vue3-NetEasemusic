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
const emit = defineEmits(['change'])
const showPrevMore = ref(false)
const showNextMore = ref(false)
const quickPrevHover = ref(false)
const quickNextHover = ref(false)
const key = ref(1)

const pages = computed(() => {
  const pagerCount = props.pagerCount
  const _currentPage = props.currentPage
  const halfPagerCount = (pagerCount - 1) / 2
  const pageCount = Number(props.total)
  let showPrevMore = false
  let showNextMore = false
  if (pageCount > pagerCount) {
    if (_currentPage > pagerCount - halfPagerCount)
      showPrevMore = true

    if (_currentPage < pageCount - halfPagerCount)
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
    for (let i = _currentPage - offset; i <= _currentPage + offset; i++)
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

const onPagerClick = (e: MouseEvent) => {
  const target = e.target as Element
  let newCurrentPage = props.currentPage
  if (target.tagName.toLowerCase() === 'ul')
    return
  if (target.tagName.toLowerCase() !== 'li') {
    const li = target.closest('li') as HTMLLIElement
    if (Array.from(li.classList).includes('left')) {
      if (newCurrentPage <= 1)
        return
      newCurrentPage--
    }
    if (Array.from(li.classList).includes('right')) {
      if (newCurrentPage === props.total)
        return
      newCurrentPage++
    }
    if (Array.from(li.classList).includes('prev')) {
      const newPage = newCurrentPage - (props.pagerCount - 2)
      newCurrentPage = newPage > 0 ? newPage : 1
    }
    if (Array.from(li.classList).includes('next')) {
      const newPage = newCurrentPage + (props.pagerCount - 2)
      newCurrentPage = newPage > props.total ? props.total : newPage
    }
    emit('change', newCurrentPage)
    key.value++
  }
  else {
    const newPage = Number(target.textContent)
    if (newPage !== newCurrentPage) {
      newCurrentPage = newPage
      key.value++
      emit('change', newPage)
    }
  }
}
</script>

<template>
  <ul v-if="total > 0" :key="key" class="flex text-[14px] items-center h-[32px] font-bold text-var(--pagination-color)" @click="onPagerClick">
    <li class="defaultStyle left" :class="!showPrevMore ? '!cursor-not-allowed ' : ''">
      <IconLeft />
    </li>
    <li class="defaultStyle" :aria-current="currentPage === 1">
      1
    </li>
    <li v-if="showPrevMore" class="defaultStyle prev" @mouseenter="quickPrevHover = true" @mouseleave="quickPrevHover = false">
      <IconDoubleLeft v-if="quickPrevHover" class="defaultStyle" />
      <IconMore v-else />
    </li>
    <li v-for="page in pages" :key="page" class="defaultStyle" :aria-current="currentPage === page">
      {{ page }}
    </li>
    <li v-if="showNextMore" class="defaultStyle next" @mouseenter="quickNextHover = true" @mouseleave="quickNextHover = false">
      <IconDoubleRight v-if="quickNextHover" class="defaultStyle" />
      <IconMore v-else />
    </li>
    <li class="defaultStyle" :aria-current="currentPage === total">
      {{ total }}
    </li>
    <li class="defaultStyle right" :class="!showNextMore ? '!cursor-not-allowed' : ''">
      <IconRight />
    </li>
  </ul>
</template>

<style scoped>
.defaultStyle {
  @apply w-7 mx-1 cursor-pointer hover:text-var(--theme-color) aria-[current='true']:text-var(--theme-color)
}
</style>
