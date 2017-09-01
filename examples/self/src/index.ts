import * as flowTools from '../../../lib/index'

export const tools = flowTools.ui.start({
  graph: require('./graph.json'),
  debug: true
})

window['toolsFlow'] = tools.getState()

tools.setFlow(tools.getState(), 'self debug')

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(tools.dispose)
}
