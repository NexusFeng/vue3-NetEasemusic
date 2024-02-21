import request from '~/utils/axios'

export const getListDetail = (params: any) => request.get('/playlist/detail', { params })

export const getSongDetail = (ids: string) => request.get(`/song/detail?ids=${ids}`)
