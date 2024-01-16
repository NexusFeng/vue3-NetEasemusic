<script lang="ts" setup>
defineProps(['id', 'name', 'playCount', 'picUrl', 'artistName'])
</script>

<template>
  <div class="w-1/4 cursor-pointer px-3 mb-8 group text-black">
    <div class="relative">
      <img :src="picUrl" class="rounded-lg">
      <div v-if="playCount" class="flex items-center absolute right-1 top-1 text-xs text-white">
        <IconPlayOne theme="filled" size="14" fill="#fff" />
        {{ playCount > 100000 ? `${Math.round(playCount / 10000)}万` : playCount }}
      </div>
      <div class="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4">
        <div class="w-14 h-14 bg-white/[.45] rounded-full opacity-0 group-hover:opacity-100 flex justify-center items-center">
          <IconPlayOne theme="filled" size="32" fill="#d33a31" />
        </div>
      </div>
    </div>
    <p v-if="name" class="mt-2 w-full truncate text-xs">
      {{ name }}
    </p>
    <p v-if="artistName" class="mt-1 w-full truncate text-xs text-var(--font-color-grey-shallow)">
      {{ artistName }}
    </p>
  </div>
</template>
