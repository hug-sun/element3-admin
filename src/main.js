import { createApp } from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'element3/lib/theme-chalk/index.css'
import Element3, { Message, useNotify } from 'element3'
import { parseTime } from '@/utils'


// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import { useIcons } from '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === "production") {
//   const { mockXHR } = require("../mock");
//   mockXHR();
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

const app = createApp(App)
  .use(router)
  .use(store)
  .use(Element3)
useIcons(app)

app.config.globalProperties.$message = Message
app.config.globalProperties.$notify = useNotify()
// 注入utils内部parseTime方法
app.config.globalProperties.$parseTime = parseTime


app.mount('#app')

app.config.globalProperties.$filters = {
  pluralize(time, label) {
    if (time === 1) {
      return time + label
    }
    return time + label + 's'
  },
  timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
      return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
      return pluralize(~~(between / 3600), ' hour')
    } else {
      return pluralize(~~(between / 86400), ' day')
    }
  },
  numberFormatter(num, digits) {
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'k' },
    ]
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      }
    }
    return num.toString()
  },
  toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  },
  uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
}
