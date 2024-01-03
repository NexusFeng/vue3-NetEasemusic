import request from '~/utils/axios'

export const getUserDetail = (uid: string) => request.get('/user/detail', { params: { uid } })

export const getUserPlaylist = (uid: string) => request.get('/user/playlist', { params: { uid, limit: 1000 } })
