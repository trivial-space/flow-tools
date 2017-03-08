import * as yo from 'yo-yo'
import * as onLoad from 'on-load'

import { Runtime } from "tvs-flow/dist/lib/runtime-types";


export interface Action {
  type: string,
  payload: any
}


export interface Template {
  (state: any, dispatch?: (Action) => void, component?: Component): HTMLElement
}


export interface Component {
  (template: Template, viewStateId: string): HTMLElement
}


export function flowComponentFactory(stateFlow: Runtime, dispatchId: string): Component {

  function dispatch(action: Action) {
    stateFlow.set(dispatchId, action)
  }

  return function component (template: Template, viewStateId: string) {
    const firstState = stateFlow.get(viewStateId)
    const element = template(firstState, dispatch, component)

    const wrapElement = el =>
      onLoad(el, () => {
        console.log('element inserted into dom!', el)
        stateFlow.on(viewStateId, update)
      }, () => {
        console.log('element removed from dom!', el)
        // TODO:
        // stateFlow.off(viewStateId, update)
        stateFlow.off(viewStateId)
      })

    const update = newState => {
      const newElement = template(newState, dispatch, component)
      wrapElement(newElement)
      yo.update(element, newElement)
    }

    wrapElement(element)

    return element
  }
}
