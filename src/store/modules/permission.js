import { asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  removeRoutes: [], // 用于删除动态路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_REMOVE_ROUTES: (state, routes) => {
    state.removeRoutes = routes
  },
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  addRoutes({ commit }, accessRoutes) {
    // 添加动态路由，同时保存移除函数，将来如果需要重置路由可以用到它们
    const removeRoutes = []
    accessRoutes.forEach(route => {
      const removeRoute = router.addRoute(route)
      removeRoutes.push(removeRoute)
    })
    commit('SET_REMOVE_ROUTES', removeRoutes)
  },
  resetRoutes({ commit, state }) {
    // 重置路由为初始状态，用户切换角色时需要用到
    state.removeRoutes.forEach(fn => fn())
    // 路由数据重置
    commit('SET_ROUTES', [])
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
