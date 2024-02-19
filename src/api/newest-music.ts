import request from '~/utils/axios'

export const getTopSongs = (type: number) => request.get(`/top/song?type=${type}`)
