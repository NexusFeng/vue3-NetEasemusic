<script lang="ts" setup>
const props = withDefaults(defineProps<{ tabs: Array; align: string; active: number }>(), {
  tabs: () => [],
  align: 'justify-end',
  active: 0,
})
const tabArr = computed(() => {
  return typeof props.tabs[0] === 'string'
    ? props.tabs.map(tab => ({ title: tab }))
    : props.tabs
})
// const onChangeTab = (tab, emit) => {
// }
</script>

<template>
  <ul
    class="flex"
    :class="props.align"
  >
    <li
      v-for="(tab, index) in tabArr"
      :key="index"
      class="py-3 mx-3 cursor-pointer text-[15px] text-var(--tab-item-color)"
      :class="[{ '!text-var(--theme-color)': active === index }, { 'hover:text-var(--tab-item-active-color)': active !== index }]"
    >
      <span class="title">{{ tab.title }}</span>
    </li>
  </ul>
</template>
