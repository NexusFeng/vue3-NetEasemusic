import request from '~/utils/axios'

export const getBanner = () => request.get('/banner?type=0')

export const getPersonalized = (params: any) => request.get('/personalized', { params })
