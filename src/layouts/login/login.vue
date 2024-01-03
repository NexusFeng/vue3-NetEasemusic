<script lang="ts" setup>
import { getUserDetail, getUserPlaylist } from '~/api/user'
import { useUserStore } from '~/store'
import Dialog from '~/components/dialog/index.vue'

const isLogin = ref(true)
const isShowDialog = ref(false)

const goLogin = () => {
  isShowDialog.value = true
}

const userStore = useUserStore()
const uid: Ref<string> = ref('332430201') // 332430201
const login = async () => {
  await getUserDetail(uid.value).then((res: any) => {
    userStore.setUserInfo(res.profile)
    userStore.setUserId(uid.value)
    isShowDialog.value = false
    isLogin.value = false
  })
  getUserPlaylist(uid.value).then((res: any) => {
    userStore.setUserPlaylist(res.playlist.slice(1))
  })
}

onMounted(() => {
  isLogin.value = Boolean(!userStore.userInfo.nickname)
})
</script>

<template>
  <Dialog v-model:visible="isShowDialog" title="登录">
    <input v-model="uid" type="text" class="w-100% mt-20px bg-slate-200 pl-10px focus:outline-none py-5px" placeholder="请输入您的网易云uid">
    <div class="mt-2">
      1、请
      <a href="http://music.163.com" target="_blank" class="text-var(--theme-color)">点我(http://music.163.com)</a>
      打开网易云音乐官网
    </div>
    <div>2、点击页面右上角的“登录”</div>
    <div>3、点击您的头像，进入我的主页</div>
    <div>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</div>
    <div class="w-100% bg-var(--theme-color) text-center text-white h-10 leading-10 mt-5 cursor-pointer" @click="login">
      登 录
    </div>
  </Dialog>
  <div class="p4">
    <div v-if="isLogin" class="flex items-center cursor-pointer" @click="goLogin">
      <IconUser class="w-24px" />
      <div>未登录</div>
    </div>
    <div v-else class="flex">
      <img :src="userStore.userInfo.avatarUrl" class="w-51px h-51px rounded-full">
      <div class="ml-2.5 flex flex-col justify-center">
        <div>{{ userStore.userInfo.nickname }}</div>
        <div class="truncate w-36">
          {{ userStore.userInfo.signature }}
        </div>
      </div>
    </div>
  </div>
</template>
