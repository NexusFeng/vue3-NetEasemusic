<script lang="ts" setup>
const props = withDefaults(defineProps<{ tabs: string[] | { title: string }[]; align: string; active: number }>(), {
  tabs: () => [],
  align: 'justify-end',
  active: 0,
})
const emit = defineEmits(['changeTab'])
function isTitleObject(item: { title: string } | string): item is { title: string } {
  return typeof item === 'object' && item !== null && 'title' in item
}
const tabArr = computed(() => {
  return !isTitleObject(props.tabs[0]) ? props.tabs.map(tab => ({ title: tab })) : props.tabs as { title: string }[]
})
const onChangeTab = (index: number) => {
  emit('changeTab', index)
}
</script>

<template>
  <ul
    class="flex"
    :class="props.align"
  >
    <li
      v-for="(tab, index) in tabArr"
      :key="index"
      class="py-3 mx-3 cursor-pointer text-xs text-var(--tab-item-color)"
      :class="[{ '!text-var(--theme-color)': active === index }, { 'hover:text-var(--tab-item-active-color)': active !== index }]"
      @click="onChangeTab(index)"
    >
      <span class="title">{{ tab.title }}</span>
    </li>
  </ul>
</template>
