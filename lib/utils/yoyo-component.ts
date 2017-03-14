import * as yo from 'yo-yo'
import * as onLoad from 'on-load'

import { Runtime } from "tvs-flow/dist/lib/runtime-types";


export interface Action {
  type: string,
  payload: any
}


export interface Dispatcher {
  (Action): void
}


export interface Template {
  (state: any, dispatch?: Dispatcher, component?: Component): HTMLElement
}


export interface Component {
  (template: Template, viewStateId: string): HTMLElement
}


let rafActions = {}
let callRaf = true

function executeRafActions () {
  for (let key in rafActions) {
    rafActions[key]()
  }
  rafActions = {}
  callRaf = true
}

function updateOnAnimationFrame(key: string, fn: Function) {
  if (callRaf) {
    requestAnimationFrame(executeRafActions)
    callRaf = false
  }
  rafActions[key] = fn
}


let componentCount = 0

export function flowComponentFactory(
  stateFlow: Runtime,
  dispatchId: string
): Component {

  function dispatch(action: Action) {
    stateFlow.set(dispatchId, action)
  }

  function component (template: Template, viewStateId: string) {
    const firstState = stateFlow.get(viewStateId)

    const element = template(firstState, dispatch, component)
    const styleKeys = Object.keys(element.style)

    const cid = 'c' + componentCount++

    element.dataset.tvsComponent = "component"

    const updateElement = () => {
      const newState =  stateFlow.get(viewStateId)

      const newElement = template(newState, dispatch, component)

      console.log('updating', element)

      yo.update(element, newElement, {
        getNodeKey: function(node) {
          return node.id || (node.dataset && node.dataset.key);
        },
        childrenOnly: true,
        onBeforeElUpdated: function(fromEl: HTMLElement) {
          return fromEl.dataset.tvsComponent !== "component"
        }
      })

      for (let i = 0; i < styleKeys.length; i++) {
        let key = styleKeys[i];
        if (element.style[key] !== newElement.style[key]) {
          console.log("updating style property", key)
          element.style[key] = newElement.style[key]
        }
      }
    }

    const update = () => updateOnAnimationFrame(cid, updateElement)

    const onload = () => {
      console.log('element inserted into dom!', element)
      stateFlow.on(viewStateId, update)
    }

    const onunload = () => {
      console.log('element removed from dom!', element)
      stateFlow.off(viewStateId, update)
    }

    onLoad(element, onload, onunload)

    return element
  }

  return component
}
