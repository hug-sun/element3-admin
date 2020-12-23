import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/element3-admin/user/login',
    method: 'post',
    data,
  })
}

export function getInfo(token) {
  return request({
    url: '/element3-admin/user/info',
    method: 'get',
    params: { token },
  })
}

export function logout() {
  return request({
    url: '/element3-admin/user/logout',
    method: 'post',
  })
}
