<script lang="ts" setup>
const props = withDefaults(defineProps<{ tabs: string[] | { title: string }[]; align?: string; active: number; type: string }>(), {
  tabs: () => [],
  align: 'justify-end',
  active: 0,
  type: '',
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
const itemClass = (index: number) => {
  const baseClass = 'py-3 mx-3 cursor-pointer text-xs text-var(--tab-item-color)'
  const splitClass = 'text-sm !py-1 px-4 mx-4 rounded-full'
  const split = index !== tabArr.value.length - 1 ? ' after:content-[\'\'] after:relative after:bg-var(--border) after:w-0.5 after:left-7 after:h-full after:inline-block after:align-middle' : ''
  if (props.type === 'split')
    return `${baseClass} ${splitClass}${split}`
  return baseClass
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
      :class="[itemClass(index), { '!text-var(--theme-color)': active === index },
               { 'hover:text-var(--tab-item-active-color)': active !== index },
               { 'bg-var(--shallow-theme-bgcolor)': active === index && type === 'split' },
      ]"
      @click="onChangeTab(index)"
    >
      <span class="title">{{ tab.title }}</span>
    </li>
  </ul>
</template>
