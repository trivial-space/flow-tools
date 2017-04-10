import tvsFlow from 'tvs-flow/dist/lib'
import { getGraphFromModules } from "../utils/webpack";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";
import { mainView } from "./view/main";
import { flowComponentFactory } from "../utils/yoyo";
import { title as titleNode, visibility, graphWindow, entitiesWindow, treeWindow, controlsPosition } from "./graph/state/gui";
import { action, element as elementNode } from "./graph/events";
import { runtime as flowNode } from "./graph/state/flow";
import { nodeState, viewBox } from "./graph/state/graph";
import Clipboard from "clipboard"

const graphModules = require.context('./graph', true, /\.ts$/)


export interface FlowTool {
    updateFlow: (Runtime) => void,
    dispose: () => void,
    getState: () => Runtime,
    getElement: () => HTMLElement
}


function saveAndRecover(title, entity, state) {
  const id = entity.getId()
  const storageId = 'tvsFlowTools' + (title ? '::' + title : '') + '::' + id

  const storedState = localStorage.getItem(storageId)
  if (storedState) {
    const value = JSON.parse(storedState)
    if (value.zIndex) value.zIndex = 0
    state.set(id, {...state.get(id), ...value})
  }

  state.on(entity.getId(), value => localStorage.setItem(storageId, JSON.stringify(value)))
}


export function start(title, opts?): FlowTool {

  const options = {
    debug: false,
    graph: null,
    ...opts
  }

  const state = tvsFlow.create()

  state.addGraph(getGraphFromModules(graphModules))
  state.flush()

  if (title) {
    state.set(titleNode.getId(), title)
  }

  if (options.graph) {
    state.set(nodeState.getId(), options.graph)
  }

  saveAndRecover(title, viewBox, state)
  saveAndRecover(title, nodeState, state)
  saveAndRecover(title, visibility, state)
  saveAndRecover(title, entitiesWindow, state)
  saveAndRecover(title, graphWindow, state)
  saveAndRecover(title, treeWindow, state)
  saveAndRecover(title, controlsPosition, state)

  const component = flowComponentFactory(state, action.getId(), options.debug)
  const element = mainView(component)

  document.body.appendChild(element)

  state.set(elementNode.getId(), element)

  const clipboard = new Clipboard('.tvs-save-graph', {
    text: () => JSON.stringify(state.get(nodeState.getId()), null, '  ')
  })

  clipboard.on('success', e => console.log('saved graph to clipboard', e))
  clipboard.on('error', e => console.log('error while saving graph to clipboard', e))

  function updateFlow(flow: Runtime) {
    requestAnimationFrame(function() {
      state.set(flowNode.getId(), flow)
    })
  }

  function dispose() {
    document.body.removeChild(element)
    clipboard.destroy()
  }

  return {
    updateFlow,
    dispose,
    getState: () => state,
    getElement: () => element
  }
}
