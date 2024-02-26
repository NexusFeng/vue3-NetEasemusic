<script setup lang="ts">
const props = defineProps(['playlist', 'songs'])

const tagsText = computed(() => props.playlist.tags.join('/'))
</script>

<template>
  <div v-if="playlist.id" class="flex p-7">
    <div class="w-50 h-50 ml-7">
      <img class="w-full h-full" :src="playlist.coverImgUrl">
    </div>
    <div class="flex flex-col justify-between flex-1">
      <div class="flex items-center mb-3">
        <p class="text-base text-var(--font-color-white)">
          {{ playlist.name }}
        </p>
      </div>
      <div class="flex items-center mb-4">
        <img :src="playlist.creator.avatarUrl" class="w-8 h-8 mr-2 rounded-full">
        <p class="mr-2">
          {{ playlist.creator.nickname }}
        </p>
        <p class="text-xs">
          {{ playlist.createTime }}
          <!-- {{ $utils.formatDate(playlist.createTime, "yyyy-MM-dd") }} 创建 -->
        </p>
      </div>
      <div class="mb-7">
        <div class="bg-[#f95043] text-[#fbdfdd] border-0 bg-gradient-to-r from-[#fa5143] via-[#f44d41] to-[#d53b32]">
          <Icon class="mr-1 align-middle" color="white" type="play-round" />
          <span class="align-middle">播放全部</span>
        </div>
      </div>
      <div class="mb-5">
        <p v-if="tagsText" class="mb-2">
          <span>标签：{{ tagsText }}</span>
        </p>
        <p v-if="playlist.description" class="mb-2">
          <span class="line-clamp-3 truncate">简介：{{ playlist.description }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
