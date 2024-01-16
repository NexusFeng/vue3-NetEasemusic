import request from '~/utils/axios'

// 精品歌单
export const getTopPlaylists = (params: any) => request.get('/top/playlist/highquality', { params })
// 获取歌单
export const getPlaylists = (params: any) => request.get('/top/playlist', { params })
