import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-element-admin/table/list',
    method: 'get',
    params,
  })
}
