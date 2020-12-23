import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/element3-admin/table/list',
    method: 'get',
    params
  })
}
