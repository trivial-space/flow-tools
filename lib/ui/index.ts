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
import { meta, selectedRuntimeId } from './graph/state/flow'


const graphModules = require.context('./graph', true, /\.ts$/)


export interface FlowTool {
	setFlow: (runtime: Runtime, label: string) => void,
	dispose: () => void,
	getState: () => Runtime,
	getElement: () => HTMLElement
}


function getLocalStorageId(label: string) {
	return 'tvsFlowTools' + '::' + label
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
		text: () => JSON.stringify(state.get(meta.getId()), null, '  ')
	})

	clipboard.on('success', e => console.log('saved graph to clipboard', e))
	clipboard.on('error', e => console.log('error while saving graph to clipboard', e))

	state.on(meta.getId(), value => {
		const label = state.get(selectedRuntimeId.getId())
		if (label) {
			localStorage.setItem(getLocalStorageId(label), JSON.stringify(value))
		}
	})

	function setFlow(runtime: Runtime, label: string) {
		const oldMeta = runtime.getMeta()
		const localValue = localStorage.getItem(getLocalStorageId(label))
		if (localValue) {
			const value = JSON.parse(localValue)
			runtime.setMeta(value)
			runtime.setMeta(oldMeta)
		}
		requestAnimationFrame(function() {
			state.set(action.getId(), {
				type: FLOW.SET_RUNTIME,
				payload: { label, runtime }
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
