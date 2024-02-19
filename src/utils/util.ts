import type {
  VNode,
  VNodeChild,
  VNodeNormalizedChildren,
} from 'vue'
import { isVNode } from 'vue'

export type VNodeChildAtom = Exclude<VNodeChild, Array<any>>
export type RawSlots = Exclude<
  VNodeNormalizedChildren,
  Array<any> | null | string
>
export type FlattenVNodes = Array<VNodeChildAtom | RawSlots>

export const flattedChildren = (
  children: FlattenVNodes | VNode | VNodeNormalizedChildren,
): FlattenVNodes => {
  const vNodes = Array.isArray(children) ? children : [children]
  const result: FlattenVNodes = []

  vNodes.forEach((child) => {
    if (Array.isArray(child)) {
      result.push(...flattedChildren(child))
    }
    else if (isVNode(child) && Array.isArray(child.children)) {
      result.push(...flattedChildren(child.children))
    }
    else {
      result.push(child)
      if (isVNode(child) && child.component?.subTree)
        result.push(...flattedChildren(child.component.subTree))
    }
  })
  return result
}

export function genArtistisText(artists: { name: string }[]) {
  return (artists || []).map(({ name }) => name).join('/')
}

function genSongPlayUrl(id: string) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function createSong(song: any) {
  const { id, name, img, artists, duration, albumId, albumName, mvId, ...rest } = song

  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    url: genSongPlayUrl(song.id),
    artistsText: genArtistisText(artists),
    durationSecond: duration / 1000,
    // 专辑 如果需要额外请求封面的话必须加上
    albumId,
    // mv的id 如果有的话 会在songTable组件中加上mv链接。
    mvId,
    ...rest,
  }
}

export function pad(num: number | string, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = `0${num}`
    len++
  }
  return num
}

export function formatTime(interval: number) {
  interval = interval | 0
  const minute = pad((interval / 60) | 0)
  const second = pad(interval % 60)
  return `${minute}:${second}`
}
