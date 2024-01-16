<script lang="ts" setup>
defineProps(['id', 'name', 'desc', 'picUrl', 'artistsName'])
</script>

<template>
  <div class="w-[calc(20%-9px)] cursor-pointer m-1 mb-8 group text-black">
    <div class="relative w-full mb-1 overflow-hidden">
      <img class="w-full rounded" :src="picUrl">
      <div v-if="desc" class="absolute p-1.5 left-0 right-0 top-0 bg-black/25 -translate-y-full transition-all delay-200 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
        <span class="text-white text-xs">{{ desc }}</span>
      </div>
      <div class="absolute w-9 h-9 bg-white/[.45] rounded-full right-2 bottom-2 transition-all delay-200 opacity-0 group-hover:opacity-100 flex justify-center items-center">
        <IconPlayOne theme="filled" size="26" fill="#d33a31" />
      </div>
    </div>
    <p class="text-sm w-full truncate">
      {{ name }}
    </p>
  </div>
</template>
