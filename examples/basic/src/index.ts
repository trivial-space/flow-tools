import * as graph from './graph'
import * as tvsFlow from 'tvs-flow'
import { flow, tools } from './flow'

flow.addGraph(
  tvsFlow.utils.entityRef.getGraphFromAll(
    tvsFlow.utils.entityRef.resolveEntityIds(graph)))


tools.setFlow(flow, 'basic')


if (module.hot) {
  module.hot.accept()
}
