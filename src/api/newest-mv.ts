import request from '~/utils/axios'

export const getAllMvs = (params: any) => request.get('/mv/all', { params })
