<script setup lang="ts">
import { formatDate } from '~/utils/util'
const props = defineProps({
  playlists: {
    type: Object,
    default: () => {},
  },
  songs: {
    type: Array,
    default: () => [],
  },
})

const tagsText = computed(() => props.playlists.tags.join('/'))
</script>

<template>
  <div v-if="playlists.id" class="flex p-7">
    <div class="w-50 h-50 mr-7">
      <img class="w-full h-full" :src="playlists.coverImgUrl">
    </div>
    <div class="flex flex-col justify-between flex-1">
      <div class="flex items-center mb-3">
        <p class="text-base text-var(--font-color-white)">
          {{ playlists.name }}
        </p>
      </div>
      <div class="flex items-center mb-4">
        <img :src="playlists.creator.avatarUrl" class="w-8 h-8 mr-2 rounded-full">
        <p class="mr-2">
          {{ playlists.creator.nickname }}
        </p>
        <p class="text-xs">
          {{ formatDate(playlists.createTime, 'yyyy-MM-dd') }}创建
        </p>
      </div>
      <div class="mb-7">
        <div class="w-28 rounded-md cursor-pointer flex justify-center p-1 items-center bg-[#f95043] text-[#fbdfdd] border-0 bg-gradient-to-r from-[#fa5143] via-[#f44d41] to-[#d53b32]">
          <IconPlay size="18" fill="#fff" />
          <span class="align-middle ml-2">播放全部</span>
        </div>
      </div>
      <div class="mb-5">
        <p v-if="tagsText" class="mb-2">
          <span>标签：{{ tagsText }}</span>
        </p>
        <p v-if="playlists.description" class="mb-2">
          <span class="line-clamp-3 truncate">简介：{{ playlists.description }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
