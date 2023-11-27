<script lang="ts" setup>
import Carousel from '~/components/carousel/main/index.vue'
import CarouselItem from '~/components/carousel/item/index.vue'
</script>

<template>
  <div class="py-18px px-32px">
    <Carousel height="300px">
      <CarouselItem v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">
          {{ item }}
        </h3>
      </CarouselItem>
    </Carousel>
  </div>
</template>
