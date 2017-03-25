import * as yo from 'yo-yo'
import * as bel from 'bel'
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
  (
    state: any,
    dispatch?: Dispatcher,
    component?: Component,
    root?: HTMLElement
  ): HTMLElement
}


export interface Component {
  (template: Template, viewStateId: string): HTMLElement
}


let rafActions = {}
let callRaf = true

function executeRafActions () {
  console.log('executeRafActions')
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

    const cid = 'c' + componentCount++

    element.dataset.tvsComponent = "component"

    const updateElement = () => {
      const newState =  stateFlow.get(viewStateId)

      const newElement = template(newState, dispatch, component, element)

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

    onLoad(element, onload, onunload, component)

    return element
  }

  return component
}


export function h (elData) {
  const tag = elData.shift(elData)

  let props = elData[0]

  if (typeof props === "object" && !Array.isArray(props) && !(props instanceof Element)) {
    elData.shift()
  } else {
    props = {}
  }

  for (let k in props) {
    if (typeof props[k] === 'boolean') {
      props[k] = '' + props[k]
    }
  }

  return bel.createElement(tag, props, elData.map(el => Array.isArray(el) ? h(el) : el))
}
