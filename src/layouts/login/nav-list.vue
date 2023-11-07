<script lang="ts" setup>
const router = useRouter()
const go = (name: string) => {
  router.push(`/song-list/${encodeURIComponent(name)}`)
}
const fixedList = [
  { key: 'discovery', name: '发现音乐' },
  { key: 'recommend', name: '推荐歌单' },
  { key: 'newest-music', name: '最新音乐' },
  { key: 'newest-mv', name: '最新MV' },
]
// const activeBg = 'text-var(--header-font-color)'
// const itemClass = ['', '', '', '']
const updateParams = (params: any) => {
  // const curPath = params.split('/').reverse()[0]
}
const stop = watch(
  () => router.currentRoute.value.path,
  params => updateParams(params),
)

onMounted(() => {
  updateParams(router.currentRoute.value.path)
})
onUnmounted(() => {
  stop()
})
</script>

<template>
  <div
    v-for="item in fixedList" :key="item.key"
    class="flex items-center cursor-pointer p4 hover:bg-var(--menu-item-hover-bg)"
    @click="go(item.key)"
  >
    <IconMusicCd v-if="item.key === 'discovery'" class="w-24px" />
    <IconMusicMenu v-if="item.key === 'recommend'" class="w-24px" />
    <IconMusic v-if="item.key === 'newest-music'" class="w-24px" />
    <IconMusicCd v-if="item.key === 'newest-mv'" class="w-24px" />
    <div>{{ item.name }}</div>
  </div>
</template>
