<script lang="ts" setup>
const router = useRouter()
const go = (name: string) => {
  router.push(`/song-list/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div class="flex items-center cursor-pointer p4" @click="go('discovery')">
    <IconMusicCd class="w-24px" />
    <div>发现音乐</div>
  </div>
  <div class="flex items-center cursor-pointer p4" @click="go('recommend')">
    <IconMusicMenu class="w-24px" />
    <div>推荐歌单</div>
  </div>
</template>
