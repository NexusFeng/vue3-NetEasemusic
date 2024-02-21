<script lang="ts" setup>
import { getListDetail, getSongDetail } from '~/api/song-list'
import { createSong } from '~/utils/util'

const router = useRoute()
const id = computed(() => {
  return router.query.id
})

const MAX = 500
// const SONG_IDX = 0
// const COMMENT_IDX = 1
const playlists = ref({})
// const song = ref([])

const genSonglist = async (playlist) => {
  const trackIds = playlist.trackIds.map(({ id }) => id)
  const songDetails = await getSongDetail(trackIds.slice(0, MAX))
  const songs = songDetails.songs.map(({ id, name, al, ar, mv, dt }) =>
    createSong({
      id,
      name,
      artists: ar,
      duration: dt,
      mvId: mv,
      albumName: al.name,
      img: al.picUrl,
    }),
  )
  songs.value = songs
}

const init = async () => {
  const { playlist } = await getListDetail({ id: id.value })
  playlists.value = playlist
  genSonglist(playlist)
}
init()

watch(id, () => {
  init()
}, { immediate: true })
</script>

<template>
  <div>{{ id }}</div>
</template>
