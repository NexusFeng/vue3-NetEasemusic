<script lang="ts" setup>
import { getUserDetail, getUserPlaylist } from '~/api/user'
import { useUserStore } from '~/store'
import Dialog from '~/components/dialog/index.vue'

const isLogin: Ref<boolean> = ref(true)
const isShowDialog: Ref<boolean> = ref(false)
const tipTitle: Ref<string> = ref('登录')

const handelLogin = (flag: boolean) => {
  tipTitle.value = flag ? '登录' : '提示'
  isShowDialog.value = true
}

const userStore = useUserStore()
const uid: Ref<string> = ref('332430201') // 332430201

const login = async () => {
  if (!isLogin.value) {
    userStore.cleanUserInfo()
    isLogin.value = true
    isShowDialog.value = false
    return
  }
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
  <Dialog v-model:visible="isShowDialog" :title="tipTitle">
    <div v-if="isLogin">
      <input v-model="uid" type="text" class="w-100% mt-5 bg-slate-200 pl-2.5 focus:outline-none py-5px" placeholder="请输入您的网易云uid">
      <div class="mt-2">
        1、请
        <a href="http://music.163.com" target="_blank" class="text-var(--theme-color)">点我(http://music.163.com)</a>
        打开网易云音乐官网
      </div>
      <div>2、点击页面右上角的“登录”</div>
      <div>3、点击您的头像，进入我的主页</div>
      <div>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</div>
    </div>
    <div v-else>
      确定要注销吗?
    </div>
    <div class="w-100% bg-var(--theme-color) text-center text-white h-10 leading-10 mt-5 cursor-pointer" @click="login">
      {{ isLogin ? '登 录' : '确 定' }}
    </div>
  </Dialog>
  <div class="p4">
    <div v-if="isLogin" class="flex items-center cursor-pointer" @click="handelLogin(true)">
      <IconUser class="w-24px" />
      <div>未登录</div>
    </div>
    <div v-else class="flex cursor-pointer" @click="handelLogin(false)">
      <img :src="userStore.userInfo.avatarUrl" class="w-45px h-45px rounded-full">
      <div class="ml-2.5 flex flex-col justify-center w-full truncate text-13px">
        <div>{{ userStore.userInfo.nickname }}</div>
        <div class="truncate">
          {{ userStore.userInfo.signature }}
        </div>
      </div>
    </div>
  </div>
</template>
