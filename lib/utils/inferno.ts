import InfernoComponent from 'inferno-component'
import createElement from 'inferno-create-element'
import { Runtime } from 'tvs-flow/dist/lib/runtime-types'
import { VNode } from 'inferno'
import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'


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
		component?: Component
	): VNode | any[]
}


export abstract class ComponentClass extends InfernoComponent<null, any> {}

export interface Component {
	(template: Template, entity: EntityRef<any>): ComponentClass
}


let rafActions = {}
let callRaf = true

function executeRafActions () {
	for (const key in rafActions) {
		rafActions[key]()
	}
	rafActions = {}
	callRaf = true
}

function updateOnAnimationFrame(key: string, fn: Function) {
	rafActions[key] = fn
	if (callRaf) {
		requestAnimationFrame(executeRafActions)
		callRaf = false
	}
}


export function flowComponentFactory(
	stateFlow: Runtime,
	dispatchId: string,
	debug = false
): Component {

	function dispatch(action: Action | string, payload: any) {
		if (typeof action === 'string') {
			stateFlow.set(dispatchId, {type: action, payload})
		} else {
			stateFlow.set(dispatchId, action)
		}
	}

	const cache = {}

	return function component (
		template: Template,
		entity: EntityRef<any>
	) {

		const viewStateId = entity.getId()

		const arghash = viewStateId + template.toString()

		if (cache[arghash]) {
			return cache[arghash]
		}

		const compClass = class extends ComponentClass {

			state = {
				current: stateFlow.get(viewStateId)
			}

			render () {
				if (this.state.current !== undefined) {
					return h(template(this.state.current, dispatch, component))
				}
			}

			update = () => {
				this.setState(state => {
					state.current = stateFlow.get(viewStateId)
					return state
				})
			}

			updateAsync = () => {
				updateOnAnimationFrame(arghash, this.update)
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

	if (typeof props === 'object' && !Array.isArray(props)) {
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
