import * as tvsFlow from 'tvs-flow'
import * as flowTools from '../../../lib/index'

export const flow = tvsFlow.create()

export const tools = flowTools.start()
window['toolsFlow'] = tools.getState()

if (module.hot) {
  module.hot.dispose(tools.dispose)
}
