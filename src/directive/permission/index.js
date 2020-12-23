import permission from './permission'

const install = function(Vue) {
  Vue.directive('permission', permission)
}

permission.install = install
export default permission
