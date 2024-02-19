<script lang="ts" setup>
import { formatTime } from '~/utils/util'
defineProps(['index', 'id', 'name', 'artistsText', 'durationSecond', 'albumName', 'img', 'mvId'])
</script>

<template>
  <div class="flex items-center w-full my-2">
    <div class="w-16">
      {{ index > 9 ? index : (`0${index}`) }}
    </div>
    <div class="w-30">
      <div class="relative w-60px h-60px mr-4 shrink-0">
        <img v-lazy class="w-full h-full rounded" :data-src="img">
        <div class="absolute w-7 h-7 bg-white/[.45] rounded-full left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 flex justify-center items-center">
          <IconPlayOne theme="filled" size="20" fill="#d33a31" />
        </div>
      </div>
    </div>
    <div class="w-64 truncate pr-8">
      <div class="flex items-center">
        <div class="mr-1 truncate">
          {{ name }}
        </div>
        <IconVideoTwo v-if="mvId" fill="#d33a31" />
      </div>
    </div>
    <div class="w-66 truncate pr-8">
      {{ artistsText }}
    </div>
    <div class="w-66 truncate pr-8">
      {{ albumName }}
    </div>
    <div>
      {{ formatTime(durationSecond) }}
    </div>
  </div>
</template>
