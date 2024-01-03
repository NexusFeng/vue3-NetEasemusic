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
const { userId } = storeToRefs(userStore)
const createList: Ref<any[]> = ref([])
const collectList: Ref<any[]> = ref([])
const init = () => {
  createList.value = userStore.playlist.filter(item => String(item.creator.userId) === userId.value)
  collectList.value = userStore.playlist.filter(item => String(item.creator.userId) !== userId.value)
}

onMounted(() => {
  menuItem.value[0].className += ' text-var(--theme-color) bg-var(--menu-item-active-bg)'
  userId && init()
})
</script>

<template>
  <div
    v-for="(item, index) in fixedList" :key="item.key"
    ref="menuItem"
    class="flex items-center cursor-pointer p4 hover:bg-var(--menu-item-hover-bg)"
    @click="go(item.key, index)"
  >
    <IconMusicCd v-if="item.key === 'discovery'" class="w-24px" />
    <IconMusicMenu v-if="item.key === 'recommend'" class="w-24px" />
    <IconMusic v-if="item.key === 'newest-music'" class="w-24px" />
    <IconMusicCd v-if="item.key === 'newest-mv'" class="w-24px" />
    <div>{{ item.name }}</div>
  </div>
  <div v-if="createList.length" class="pl-18px">
    <div>创建的歌单</div>
  </div>
</template>
