<script lang="ts" setup>
import { getBanner, getNewSongs, getPersonalized, getPersonalizedMv } from '~/api/discover'
import Carousel from '~/components/carousel/main/index.vue'
import CarouselItem from '~/components/carousel/item/index.vue'
import SongCard from '~/components/card/song-card.vue'
import MVCard from '~/components/card/mv-card.vue'

interface Banner {
  imageUrl: string
  encodeId: string
}
interface SongList {
  id: number
  name: string
  picUrl: string
  artistName: string
  copywirter: string
}
interface LatestSongList extends SongList {
  artistsName: string
}
interface MVList extends SongList {
  playCount: number
}
// 获取banner
const banners: Ref<Banner[]> = ref([])
getBanner().then((res) => {
  banners.value = (res as any).banners
})
// 获取推荐歌单列表
const songList: Ref<SongList[]> = ref([])
getPersonalized({ limit: 10 }).then((res) => {
  songList.value = (res as any).result
})
// 获取最新音乐列表
const latestSong: Ref<LatestSongList[]> = ref([])
getNewSongs().then((res) => {
  latestSong.value = (res as any).result.map((item: any) => {
    item.artistsName = (item.song.artists || []).map(({ name }: { name: string }) => name).join('/')
    return item
  })
})
// 获取推荐MV
const MVLists: Ref<MVList[]> = ref([])
getPersonalizedMv().then((res) => {
  MVLists.value = (res as any).result
})
</script>

<template>
  <div class="pt-4">
    <Carousel height="200px">
      <CarouselItem v-for="item in banners" :key="item.encodeId">
        <img :src="item.imageUrl">
      </CarouselItem>
    </Carousel>
  </div>
  <div class="mb-3 text-lg">
    推荐歌单
  </div>
  <div class="flex -mx-1 flex-wrap">
    <SongCard v-for="item in songList" :key="item.id" v-bind="item" />
  </div>
  <div class="my-3 text-lg text-black">
    最新音乐
  </div>
  <div class="flex mb-9 flex-wrap text-black">
    <div v-for="(item, index) in latestSong" :key="item.id" class=" overflow-hidden w-1/2 hover:bg-var(--light-bgcolor)">
      <div class="flex p-4 text-xs cursor-pointer">
        <div class="w-30px mr-4 flex justify-center items-center">
          <span>{{ (index > 8 ? '' : '0') + (index + 1) }}</span>
        </div>
        <div class="relative w-60px h-60px mr-4 shrink-0">
          <img class="w-full h-full" :src="item.picUrl">
          <div class="absolute w-7 h-7 bg-white/[.45] rounded-full left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 flex justify-center items-center">
            <IconPlayOne theme="filled" size="20" fill="#d33a31" />
          </div>
        </div>
        <div class="flex flex-col justify-around flex-1 shrink-0 overflow-hidden">
          <p class="w-full truncate">
            {{ item.name }}
          </p>
          <p class="w-full truncate">
            {{ item.artistsName }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="my-3 text-lg text-black">
    推荐MV
  </div>
  <div class="flex flex-wrap -mx-3">
    <MVCard v-for="item in MVLists" :key="item.id" v-bind="item" />
  </div>
</template>
