import * as flowTools from '../../../lib/index'

export const tools = flowTools.ui.start('self debug', {
  graph: require('./graph.json'),
  debug: true
})

window['toolsFlow'] = tools.getState()

tools.updateFlow(tools.getState())

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(tools.dispose)
}
