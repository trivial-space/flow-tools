import tvsFlow from 'tvs-flow/dist/lib'
import { getGraphFromModules } from "./utils/webpack";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";
import { view } from "./view/main";
import { flowComponentFactory } from "./utils/yoyo-component";

const graphModules = require.context('./graph', true, /\.ts$/)


export function start() {

  const state = tvsFlow.create()

  state.addGraph(getGraphFromModules(graphModules))

  const component = flowComponentFactory(state, 'events.dispatcher')

  const element = view(component)
  document.body.appendChild(element)

  function updateFlow(flow: Runtime) {
     state.set('state.flow', flow)
  }

  return {
    updateFlow,
    getState: () => state,
    getElement: () => element
  }
}
