<script lang="ts" setup>
import { getBanner } from '~/api/discover'
import Carousel from '~/components/carousel/main/index.vue'
import CarouselItem from '~/components/carousel/item/index.vue'

interface Banner {
  imageUrl: string
  encodeId: string
}
const banners: Ref<Banner[]> = ref([])
getBanner().then((res) => {
  banners.value = (res as any).banners
})
</script>

<template>
  <div class="py-18px px-32px">
    <Carousel height="200px">
      <CarouselItem v-for="item in banners" :key="item.encodeId">
        <img :src="item.imageUrl">
      </CarouselItem>
    </Carousel>
  </div>
</template>
