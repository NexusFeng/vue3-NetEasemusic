<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/store'

const fixedList = [
  { key: 'discovery', name: '发现音乐' },
  { key: 'recommend', name: '推荐歌单' },
  { key: 'newest-music', name: '最新音乐' },
  { key: 'newest-mv', name: '最新MV' },
]
const menuItem: Ref = ref([])
const router = useRouter()
const go = (name: string, index: number) => {
  menuItem.value.forEach((ref: HTMLElement, idx: number) => {
    if (index === idx)
      ref.className += ' text-var(--theme-color) bg-var(--menu-item-active-bg)'
    else
      ref.classList.remove('text-var(--theme-color)', 'bg-var(--menu-item-active-bg)')
  })
  router.push(`/song-list/${encodeURIComponent(name)}`)
}

const userStore = useUserStore()
const { userId, playlist } = storeToRefs(userStore)
const createList: Ref = ref([])
const collectList: Ref = ref([])

watch(playlist, () => {
  createList.value = userStore.playlist.filter(item => String(item.creator.userId) === userId.value)
  collectList.value = userStore.playlist.filter(item => String(item.creator.userId) !== userId.value)
}, { immediate: true })

onMounted(() => {
  menuItem.value[0].className += ' text-var(--theme-color) bg-var(--menu-item-active-bg)'
})
</script>

<template>
  <div class="h-[calc(100%-85px)] overflow-y-scroll">
    <div
      v-for="(item, index) in fixedList" :key="item.key"
      ref="menuItem"
      class="flex items-center cursor-pointer p-4 hover:bg-var(--menu-item-hover-bg)"
      @click="go(item.key, index)"
    >
      <IconMusicCd v-if="item.key === 'discovery'" class="w-6" />
      <IconMusicMenu v-if="item.key === 'recommend'" class="w-6" />
      <IconMusic v-if="item.key === 'newest-music'" class="w-6" />
      <IconMusicCd v-if="item.key === 'newest-mv'" class="w-6" />
      <div class="text-13px">
        {{ item.name }}
      </div>
    </div>
    <div v-if="createList.length">
      <div class="p-4 text-xs">
        创建的歌单
      </div>
      <div v-for="item in createList" :key="item.id" class="flex items-center cursor-pointer p-4 hover:bg-var(--menu-item-hover-bg)">
        <IconMusicMenu class="w-6" />
        <div class="w-full truncate text-13px">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div v-if="collectList.length">
      <div class="p-4 text-xs">
        收藏的歌单
      </div>
      <div v-for="item in collectList" :key="item.id" class="flex items-center cursor-pointer p-4 hover:bg-var(--menu-item-hover-bg)">
        <IconMusicMenu class="w-6" />
        <div class="w-full truncate text-13px">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
