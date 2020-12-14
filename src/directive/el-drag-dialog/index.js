import drag from './drag'

const install = function(app) {
  app.directive('el-drag-dialog', drag)
}

if (window.app) {
  window['el-drag-dialog'] = drag
  app.use(install); // eslint-disable-line
}

drag.install = install
export default drag
