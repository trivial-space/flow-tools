import * as graph from './graph'
import * as tvsFlow from 'tvs-flow'
import * as flowTools from '../../../lib/index'

const flow = tvsFlow.create()

flow.addGraph(
  tvsFlow.utils.entityRef.getGraphFromAll(
    tvsFlow.utils.entityRef.resolveEntityIds(graph)))


const tools = flowTools.start()
tools.updateFlow(flow)

window['toolsFlow'] = tools.getState()
