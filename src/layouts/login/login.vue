<script lang="ts" setup>
import Dialog from '~/components/dialog/index.vue'
const isLogin = ref(true)
const isShowDialog = ref(false)

const login = () => {
  isShowDialog.value = true
}
</script>

<template>
  <Dialog v-model:visible="isShowDialog">
    123
  </Dialog>
  <div class="p4">
    <div v-if="isLogin" class="flex items-center cursor-pointer" @click="login">
      <IconUser class="w-24px" />
      <div>未登录</div>
    </div>
    <div v-else>
      <img src="" alt="">
      <div>未登录</div>
    </div>
  </div>
</template>
