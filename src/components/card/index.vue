<script lang="ts" setup>
const props = defineProps(['id', 'name', 'copywirter', 'picUrl'])
</script>

<template>
  <div class="w-[calc(20%-9px)] cursor-pointer m-1 mb-8">
    <div class="relative w-full mb-1">
      <img class="w-full rounded" :src="props.picUrl">
      <div class="absolute w-9 h-9 bg-white/[.45] rounded-full pt-1 pl-1.2 right-2 bottom-2">
        <IconPlayOne theme="filled" size="28" fill="#d33a31" />
      </div>
    </div>
    <p class="text-sm w-full truncate">
      {{ props.name }}
    </p>
  </div>
</template>
