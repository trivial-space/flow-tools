import tvsFlow from 'tvs-flow/dist/lib'
import { getGraphFromModules } from "./utils/webpack";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";
import { mainView } from "./view/main";
import { flowComponentFactory } from "./utils/yoyo";
import { title as titleNode } from "./graph/state/gui";
import { action, element as elementNode } from "./graph/events";
import { runtime as flowNode } from "./graph/state/flow";
import { nodeState } from "./graph/state/graph";

const graphModules = require.context('./graph', true, /\.ts$/)


export function start(title = 'tvs-flow tools') {

  const state = tvsFlow.create()

  state.addGraph(getGraphFromModules(graphModules))

  state.set(titleNode.getId(), title)

  const graphUIState = localStorage.getItem(title)
  if (graphUIState) {
    state.set(nodeState.getId(), JSON.parse(graphUIState))
  }

  const component = flowComponentFactory(state, action.getId())
  const element = mainView(component)

  document.body.appendChild(element)

  state.set(elementNode.getId(), element)

  function updateFlow(flow: Runtime) {
    state.set(flowNode.getId(), flow)
  }

  function dispose() {
    document.body.removeChild(element)
  }

  return {
    updateFlow,
    dispose,
    getState: () => state,
    getElement: () => element
  }
}
