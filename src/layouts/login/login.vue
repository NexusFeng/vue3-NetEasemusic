<script lang="ts" setup>
const isLogin = ref(true)
</script>

<template>
  <div class="p4">
    <div v-if="isLogin" class="flex items-center cursor-pointer">
      <IconUser class="w-24px" />
      <div>未登录</div>
    </div>
    <div v-else>
      <img src="" alt="">
      <div>未登录</div>
    </div>
  </div>
</template>
