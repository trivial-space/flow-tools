import tvsFlow from 'tvs-flow/dist/lib'
import { getGraphFromModules } from "../utils/webpack";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";
import { mainView } from "./view/main";
import { flowComponentFactory } from "../utils/yoyo";
import { title as titleNode, visibility, graphWindow, entitiesWindow, treeWindow, controlsPosition } from "./graph/state/gui";
import { action, element as elementNode } from "./graph/events";
import { runtime as flowNode } from "./graph/state/flow";
import { nodeState, viewBox } from "./graph/state/graph";

const graphModules = require.context('./graph', true, /\.ts$/)


export interface FlowTool {
    updateFlow: (Runtime) => void,
    dispose: () => void,
    getState: () => Runtime,
    getElement: () => HTMLElement
}


function saveAndRecover(title, entity, state) {
  const storageId = title + '::' + entity.getId()

  const storedState = localStorage.getItem(storageId)
  if (storedState) {
    const value = JSON.parse(storedState)
    if (value.zIndex) value.zIndex = 0
    state.set(entity.getId(), value)
  }

  state.on(entity.getId(), value => localStorage.setItem(storageId, JSON.stringify(value)))
}


export function start(title = 'tvs-flow tools', debug = false): FlowTool {

  const state = tvsFlow.create()

  state.addGraph(getGraphFromModules(graphModules))

  state.set(titleNode.getId(), title)

  saveAndRecover(title, viewBox, state)
  saveAndRecover(title, nodeState, state)
  saveAndRecover(title, visibility, state)
  saveAndRecover(title, entitiesWindow, state)
  saveAndRecover(title, graphWindow, state)
  saveAndRecover(title, treeWindow, state)
  saveAndRecover(title, controlsPosition, state)

  const component = flowComponentFactory(state, action.getId(), debug)
  const element = mainView(component)

  document.body.appendChild(element)

  state.set(elementNode.getId(), element)

  function updateFlow(flow: Runtime) {
    requestAnimationFrame(function() {
      state.set(flowNode.getId(), flow)
    })
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
