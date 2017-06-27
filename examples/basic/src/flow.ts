import * as tvsFlow from 'tvs-flow'
import * as flowTools from '../../../lib/index'
import { Runtime } from 'tvs-flow/dist/lib/runtime-types'

export const flow: Runtime = tvsFlow.create()

export const tools = flowTools.ui.start('basic flow example')
window['toolsFlow'] = tools.getState()

if (module.hot) {
  module.hot.dispose(tools.dispose)
}
