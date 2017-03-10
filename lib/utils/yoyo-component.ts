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


export function flowComponentFactory(stateFlow: Runtime, dispatchId: string): Component {

  function dispatch(action: Action) {
    stateFlow.set(dispatchId, action)
  }

  function component (template: Template, viewStateId: string) {
    const firstState = stateFlow.get(viewStateId)

    const element = template(firstState, dispatch, component)
    element.dataset.tvsComponent = "component"

    const update = newState => {
      const newElement = template(newState, dispatch, component)
      console.log('updating', element)
      yo.update(element, newElement, {
        getNodeKey: function(node) {
          return node.id || (node.dataset && node.dataset.key);
        },
        childrenOnly: true,
        onBeforeElUpdated: function(fromEl: HTMLElement) {
          return fromEl.dataset.tvsComponent !== "component";
        },
      })
    }

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
