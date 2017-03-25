import tvsFlow from 'tvs-flow/dist/lib'
import { getGraphFromModules } from "./utils/webpack";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";
import { mainView } from "./view/main";
import { flowComponentFactory } from "./utils/yoyo";

const graphModules = require.context('./graph', true, /\.ts$/)


export function start() {

  const state = tvsFlow.create()

  state.addGraph(getGraphFromModules(graphModules))
  state.flush()

  const component = flowComponentFactory(state, 'events.dispatch')

  const element = mainView(component)

  document.body.appendChild(element)

  state.set('events.onDom', element)

  function updateFlow(flow: Runtime) {
     state.set('state.flow.runtime', flow)
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
