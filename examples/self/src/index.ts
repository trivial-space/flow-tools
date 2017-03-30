import * as flowTools from '../../../lib/index'

export const tools = flowTools.ui.start()
window['toolsFlow'] = tools.getState()

requestAnimationFrame(function() {
  tools.updateFlow(tools.getState())
})

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(tools.dispose)
}
