<script lang="ts" setup>
const props = withDefaults(defineProps<{ tabs: string[]; align: string; active: number }>(), {
  tabs: () => [],
  align: 'justify-end',
  active: 0,
})
const emit = defineEmits(['changeTab'])
const tabArr = computed(() => {
  return props.tabs
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
      <span class="title">{{ tab }}</span>
    </li>
  </ul>
</template>
