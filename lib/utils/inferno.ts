import InfernoComponent from 'inferno-component'
import createElement from 'inferno-create-element'
import { Runtime } from "tvs-flow/dist/lib/runtime-types";
import { VNode } from "inferno";


export interface Action {
  type: string,
  payload: any
}


export interface Dispatcher {
  (
    action: Action | string,
    payload?: any
  ): void
}


export interface Template {
  (
    state: any,
    dispatch?: Dispatcher,
    component?: Component,
  ): VNode | any[]
}

export abstract class ComponentClass extends InfernoComponent<null, any> {}

export interface Component {
  (template: Template, viewStateId: string): ComponentClass
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


export function flowComponentFactory(
  stateFlow: Runtime,
  dispatchId: string,
  debug = false
): Component {

  function dispatch(action: Action | string, payload: any) {
    if (typeof action === "string") {
      stateFlow.set(dispatchId, {type: action, payload})
    } else {
      stateFlow.set(dispatchId, action)
    }
  }

  const cache = {}

  return function component (
    template: Template,
    viewStateId: string
  ) {

    const arghash = viewStateId + template.name

    if (cache[arghash]) {
      return cache[arghash]
    }

    const compClass = class extends ComponentClass {

      state = {
        current: stateFlow.get(viewStateId)
      }

      render () {
        return h(template(this.state.current, dispatch, component))
      }

      updateAsync = () => {
        updateOnAnimationFrame(arghash, () => {
          this.setState(state => {
            state.current = stateFlow.get(viewStateId)
            return state
          })
        })
      }

      componentDidMount() {
        debug && console.log('component mounted!', this)
        stateFlow.on(viewStateId, this.updateAsync)
      }

      componentWillUnmount() {
        debug && console.log('component will unmount!', this)
        stateFlow.off(viewStateId, this.updateAsync)
      }
    }

    cache[arghash] = compClass

    return compClass
  }
}


export function h (el): VNode {
  if (typeof el === 'function') {
    return createElement(el)
  }

  if (!Array.isArray(el)) {
    return el
  }

  const tag = el.shift()

  let props = el[0]

  if (typeof props === "object" && !Array.isArray(props)) {
    el.shift()
  } else {
    props = {}
  }

  if (el.length) {
    return createElement(tag, props, el.map(h))
  } else {
    return createElement(tag, props)
  }
}
