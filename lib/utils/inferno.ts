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
  ): VNode
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

  return function component (
    template: Template,
    viewStateId: string
  ) {

    const arghash = viewStateId + template.name

    return class extends ComponentClass {

      state = {
        current: stateFlow.get(viewStateId)
      }

      render () {
        return template(this.state.current, dispatch, component)
      }

      updateComponent () {
        this.setState(state => {
          state.current = stateFlow.get(viewStateId)
          return state
        })
      }

      updateAsync () {
        updateOnAnimationFrame(arghash, this.updateComponent)
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
  }
}


export function h (elData): VNode {
  const tag = elData.shift(elData)

  let props = elData[0]

  if (typeof props === "object" && !Array.isArray(props)) {
    elData.shift()
  } else {
    props = {}
  }

  if (elData.length) {
    return createElement(tag, props, elData.map(el => Array.isArray(el)
      ? h(el)
      : typeof el === 'function'
        ? createElement(el)
        : el))
  } else {
    return createElement(tag, props)
  }

}
