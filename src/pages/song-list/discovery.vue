<script lang="ts" setup>
import { getBanner, getPersonalized } from '~/api/discover'
import Carousel from '~/components/carousel/main/index.vue'
import CarouselItem from '~/components/carousel/item/index.vue'
import Card from '~/components/card/index.vue'

interface Banner {
  imageUrl: string
  encodeId: string
}
interface SongList {
  id: number
  name: string
  picUrl: string
  copywirter: string
}
const banners: Ref<Banner[]> = ref([])
getBanner().then((res) => {
  banners.value = (res as any).banners
})

const songList: Ref<SongList[]> = ref([])
getPersonalized({ limit: 10 }).then((res) => {
  songList.value = (res as any).result
})
</script>

<template>
  <div class="py-18px">
    <Carousel height="200px">
      <CarouselItem v-for="item in banners" :key="item.encodeId">
        <img :src="item.imageUrl">
      </CarouselItem>
    </Carousel>
  </div>
  <div class="mb-3 text-lg text-black">
    推荐歌单
  </div>
  <div class="flex -mx-1 flex-wrap">
    <Card v-for="item in songList" :key="item.id" v-bind="item" />
  </div>
</template>
