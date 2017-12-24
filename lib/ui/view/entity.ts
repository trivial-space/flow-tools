import * as icon from './icons'
import { iconBtn } from './ui'
import { buttonStyle } from './styles/ui'
import { windowContentStyle, entityViewStyle } from './styles/components'
import { GUI, FLOW } from '../actions'
import { printEntityName, ProcessedGraphProcess, ProcessedGraph, ProcessedGraphEntity } from '../../utils/entity-data-helpers'


function jsonCode (initialValue, readonly, currentValueContainer) {
	let code = ''
	if (initialValue != null) { // value is null when no active node selected
		try {
			code = JSON.stringify(initialValue, null, '  ')
		} catch (e) {
			code = 'Error: ' + e.message
		}
	}

	return ['code',
		['pre', {
				contentEditable: !readonly,
				onInput: e => currentValueContainer.value = e.target.textContent
			},
			code]]
}


export function entityValueView ({entity, value, watching}, dispatch) {
	const editingValue = {value: value}
	const buttons: any = ['div', {
		'style': 'margin-top: 4px'
	}]

	if (watching) {

		buttons.push(
			['button', {
					class: buttonStyle,
					key: 'edit-btn',
					onclick: () => dispatch(GUI.ENTITY.WATCH_ACTIVE_ENTITY, false)
				}, 'Edit'],
			iconBtn({
				key: 'inspect-btn-' + entity.id,
				onclick: () => dispatch(FLOW.ENTITY_INSPECT, entity.id),
				icon: icon.show(),
				title: 'Inspect entity value'
			}))

		if (entity.value) {
			buttons.push(
				iconBtn({
					key: 'reset-btn-' + entity.id,
					onclick: () => dispatch(FLOW.ENTITY_RESET, entity.id),
					icon: icon.reset(),
					title: 'Reset entity value'
				}))
		}

	} else {
		buttons.push(
			['button', {
					class: buttonStyle,
					onclick: () => dispatch(GUI.ENTITY.WATCH_ACTIVE_ENTITY, true)
				}, 'Cancel'],
			['button', {
					class: buttonStyle,
					key: 'save-btn-' + entity.id,
					onclick: () => {
						const val = JSON.parse(editingValue.value)
						dispatch(GUI.ENTITY.SAVE_VALUE, val)
					}
				}, 'Save']
		)
	}

	const el =
		['section', {
				class: entityViewStyle
			},
			['div', { class: windowContentStyle, key: entity.id + watching },
				jsonCode(value, watching, editingValue)],
			entity.id && buttons]

	return el
}


export function entityDetailsView ({entity, graph}: {entity: ProcessedGraphEntity, graph: ProcessedGraph}, dispatch) {

	const el = ['section', {
			class: entityViewStyle
		},
		['div', { class: windowContentStyle },
			['table',
				['tr',
					['td', 'name'],
					['td', entity.name]],
				...entity.processes.map(p => ['tr',
					['td', 'process'],
					['td', printEntityName(graph.processes[p])]])
			]],

		['div', {
			'style': 'margin-top: 4px'
			},
			iconBtn({
				key: 'inspect-btn-' + entity.id,
				onclick: () => dispatch(FLOW.ENTITY_INSPECT, entity.id),
				icon: icon.show(),
				title: 'Inspect entity value'
			})
		]]

	return el
}


function getProcessButtons (process, dispatch) {
	const buttons: any = ['div', {
		'style': 'margin-top: 4px'
	}]

	buttons.push(
		iconBtn({
			onclick: () => dispatch(FLOW.PROCESS_RUN, process.id),
			icon: icon.play(),
			title: 'Run process'
		}))

	if (process.async) {
		buttons.push(
			iconBtn({
				onclick: () => dispatch(FLOW.PROCESS_STOP, process.id),
				icon: icon.stop(),
				title: 'Stop async process'
			}))
	}

	return buttons
}

export function processValueView ({process}, dispatch) {

	return ['section', {
			class: entityViewStyle
		},
		['div', { class: windowContentStyle },
			['code',
				['pre', process.procedure.toString()]]],
		getProcessButtons(process, dispatch)]
}


export function processDetailsView ({process, graph}: {process: ProcessedGraphProcess, graph: ProcessedGraph}, dispatch) {

	let type = process.reaction
		? 'Reaction'
		: process.async
			? 'Async Stream'
			: 'Stream'

	if (process.autostart) {
		type += ' Autostart'
	}

	const el = ['section', {
			class: entityViewStyle
		},
		['div', { class: windowContentStyle },
			['table',
				['tr',
					['td', 'name'],
					['td', process.name]],
				['tr',
					['td', 'type'],
					['td', type]],
				['tr',
					['td', 'output'],
					['td', ['a', printEntityName(graph.entities[process.output])]]]
				]],
		getProcessButtons(process, dispatch)]

	return el
}
