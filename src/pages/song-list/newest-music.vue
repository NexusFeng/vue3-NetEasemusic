<script lang="ts" setup>
import Tab from '~/components/tabs/index.vue'
import SongTable from '~/components/card/song-list.vue'
import { getTopSongs } from '~/api/newest-music'
import { createSong } from '~/utils/util'

interface SongList {
  id: number
  name: string
  picUrl: string
  artistName: string
  copywirter: string
  playCount: number
}

const tabs = [
  { title: '全部', type: 0 },
  { title: '华语', type: 7 },
  { title: '欧美', type: 96 },
  { title: '日本', type: 8 },
  { title: '韩国', type: 16 },
]
const songList: Ref<SongList[]> = ref([])
const activeTabIndex: Ref<number> = ref(0)

const getList = () => {
  getTopSongs(tabs[activeTabIndex.value].type).then((res) => {
    songList.value = res.data.map((song: any) => {
      const {
        id,
        name,
        artists,
        duration,
        mvid,
        album: { picUrl, name: albumName },
      } = song
      return createSong({
        id,
        name,
        artists,
        duration,
        albumName,
        img: picUrl,
        mvId: mvid,
      })
    })
  })
}
// 初始化
getList()

const changeTab = (index: number) => {
  activeTabIndex.value = index
  getList()
}
</script>

<template>
  <div class="p4">
    <Tab :tabs="tabs" align="justify-end" :active="activeTabIndex" @changeTab="changeTab" />
  </div>
  <div v-for="(item, index) in songList" :key="item.id">
    <SongTable v-bind="{ ...item, index: index + 1 }" />
  </div>
</template>
