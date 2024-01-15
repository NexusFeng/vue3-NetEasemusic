<script lang="ts" setup>
import { getTopPlaylists } from '~/api/recommend'
const tabs = ['全部', '欧美', '华语', '流行', '说唱', '摇滚', '民谣', '电子', '轻音乐', '影视原声', 'ACG', '怀旧', '治愈', '旅行']

interface TopBanner {
  coverImgUrl: string
  name: string
  description: string
}
const topPlayBanner: Ref<TopBanner> = ref({
  coverImgUrl: '',
  name: '',
  description: '',
})
const activeTabIndex: Ref<number> = ref(0)
getTopPlaylists({
  limit: 1,
  cat: tabs[activeTabIndex.value],
}).then((res) => {
  topPlayBanner.value = (res as any).playlists[0] || {}
})

const onClickCard = () => {
}
</script>

<template>
  <div class="p4">
    <div class="relative overflow-hidden rounded cursor-pointer" @click="onClickCard">
      <div class="relative z-1 flex p-4">
        <div class="w-36 h-36 mr-2">
          <img :src="topPlayBanner.coverImgUrl">
        </div>
        <div class="flex-1 flex flex-col justify-center">
          <div class="self-start py-1 px-4 rounded text-var(--gold) border border-current border-solid">
            <span>精品歌单</span>
          </div>
          <p class="mb-2 text-base text-white">
            {{ topPlayBanner.name }}
          </p>
          <p class="text-xs text-white/50 line-clamp-5">
            {{ topPlayBanner.description }}
          </p>
        </div>
      </div>
      <div :style="{ backgroundImage: `url(${topPlayBanner.coverImgUrl})` }" class="w-full h-full bg-cover z-0 blur-lg absolute left-0 right-0 top-0 bottom-0" />
      <div class="absolute left-0 right-0 top-0 bottom-0 text-white/50 z-0" />
    </div>
  </div>
</template>
