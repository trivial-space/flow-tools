import tvsFlow from 'tvs-flow/dist/lib'
import { getGraphFromModules } from '../utils/webpack'
import { Runtime } from 'tvs-flow/dist/lib/runtime-types'
import { mainView } from './view/main'
import { flowComponentFactory } from '../utils/inferno'
import { action, element as elementNode } from './graph/events'
import Clipboard from 'clipboard'
import Inferno from 'inferno'
import createElement from 'inferno-create-element'
import { FLOW } from './actions'


const graphModules = require.context('./graph', true, /\.ts$/)


export interface FlowTool {
		setFlow: (Runtime, string?) => void,
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


export function start(opts?): FlowTool {

	const options = {
		debug: false,
		graph: null,
		...opts
	}

	const state = tvsFlow.create()

	state.addGraph(getGraphFromModules(graphModules))
	state.flush()

	const component = flowComponentFactory(state, action.getId(), options.debug)
	const RootComponent = mainView(component)
	const element = document.createElement('div')
	element.className = 'tvs-flow-tools-container'

	document.body.appendChild(element)

	Inferno.render(createElement(RootComponent), element)

	state.set(elementNode.getId(), element)

	const clipboard = new Clipboard('.tvs-save-graph', {
		text: () => JSON.stringify(state.get(nodeState.getId()), null, '  ')
	})

	clipboard.on('success', e => console.log('saved graph to clipboard', e))
	clipboard.on('error', e => console.log('error while saving graph to clipboard', e))

	let runtimeIndex = 0
	function setFlow(runtime: Runtime, label?: string) {
		requestAnimationFrame(function() {
			runtimeIndex++
			state.set(action.getId(), {
				type: FLOW.SET_RUNTIME,
				payload: {
					label: label || 'Runtime ' + runtimeIndex,
					runtime
				}
			})
		})
	}

	function dispose() {
		document.body.removeChild(element)
		clipboard.destroy()
	}

	return {
		setFlow,
		dispose,
		getState: () => state,
		getElement: () => element
	}
}
