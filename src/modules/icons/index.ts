import type { App } from 'vue'
import {
  Github,
  Left,
  MusicCd,
  MusicMenu,
  Right,
  Search,
  Theme,
  User,
} from '@icon-park/vue-next'

export interface Icons {
  [key: string]: typeof Search
}

export const icons: Icons = {
  IconSearch: Search,
  IconTheme: Theme,
  IconGithub: Github,
  IconLeft: Left,
  IconRight: Right,
  IconUser: User,
  IconMusicCd: MusicCd,
  IconMusicMenu: MusicMenu,
}
export const install = (app: App) => {
  for (const key of Object.keys(icons))
    app.component(key, icons[key])
}
