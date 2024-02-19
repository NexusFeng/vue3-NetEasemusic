import { defineStore } from 'pinia'

export interface UserInfo {
  signature?: string
  nickname?: string
  userId?: number
  avatarUrl?: string
}

export interface Info {
  userInfo: UserInfo
  userId: string
  playlist: Array<any>
  currentNav: string
}

export const useUserStore = defineStore('user', {
  state: (): Info => ({
    userInfo: {},
    userId: '',
    playlist: [],
    currentNav: '',
  }),
  persist: true,
  actions: {
    setUserInfo(userInfo: {}) {
      this.userInfo = userInfo
    },
    setUserId(userId: string) {
      this.userId = userId
    },
    setCurrentNav(currentNav: string) {
      this.currentNav = currentNav
    },
    setUserPlaylist(playList: []) {
      this.playlist = playList
    },
    cleanUserInfo() {
      this.userInfo = {}
      this.userId = ''
      this.currentNav = ''
      this.playlist = []
    },
  },
})
