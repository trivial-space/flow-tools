import * as graph from './graph'
import * as tvsFlow from 'tvs-flow'
import { flow, tools } from "./flow";

flow.addGraph(
  tvsFlow.utils.entityRef.getGraphFromAll(
    tvsFlow.utils.entityRef.resolveEntityIds(graph)))


requestAnimationFrame(function() {
  tools.updateFlow(flow)
})


if (module.hot) {
  module.hot.accept()
}
