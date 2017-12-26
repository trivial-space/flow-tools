import * as icon from './icons'
import { iconBtn } from './ui'
import { buttonStyle } from './styles/ui'
import { windowContentStyle, entityViewStyle } from './styles/components'
import { GUI, FLOW } from '../actions'
import { printEntityName, ProcessedGraphProcess, ProcessedGraph, ProcessedGraphEntity } from '../../utils/entity-data-helpers'
import { PORT_TYPES } from 'tvs-flow/dist/lib/runtime-types'


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


export function entityDetailsView ({ entity, graph, meta }: { entity: ProcessedGraphEntity, graph: ProcessedGraph, meta: any }, dispatch) {
	if (!entity.id) {
		return ['section',
			{ class: entityViewStyle },
			['div', { class: windowContentStyle }]]
	}

	const processes = (entity.processes || []).map(pid => graph.processes[pid])
	const streams = processes.filter(p => !p.reaction)
	const reactions = processes.filter(p => p.reaction)
	let tempMeta = meta ? JSON.stringify(meta, null, '  ') : ''

	function printProcessInputs(p: ProcessedGraphProcess) {
		const parts = [
			'(',
			p.inputs
				.filter(p => p.type !== PORT_TYPES.ACCUMULATOR)
				.map(ePort => {
					const e = graph.entities[ePort.eid]
					return (e.namespace === entity.namespace
						? e.name
						: e.namespace + '/' + e.name) + '::' + ePort.type
				}).join(', '),
			')'
		]

		if (p.autostart) {
			parts.unshift('S')
		}
		if (p.async) {
			parts.unshift('A')
		}

		return parts.join('')
	}

	const el = ['section', {
			class: entityViewStyle
		},
		['div', { class: windowContentStyle },
			['table',
				['tr',
					['th', 'name'],
					['td', entity.name]],
				['tr',
					['th', 'namespace'],
					['td', entity.namespace]],
				(streams.length > 0 && ['tr',
					['th', 'streams'],
					['td', ...streams.map(s => ['p',
						['a', {
							onClick: () => dispatch(GUI.ENTITY.SET_ACTIVE_PROCESS, s.id)
						}, printProcessInputs(s)]])]]),
				(reactions.length > 0 && ['tr',
					['th', 'reactions'],
					['td', ...reactions.map(r => ['p',
						['a', {
							onClick: () => dispatch(GUI.ENTITY.SET_ACTIVE_PROCESS, r.id)
						}, printProcessInputs(r)]])]])
			],
			(entity.value && ['h3', ' initial value  ',
				iconBtn({
					onclick: () => dispatch(FLOW.ENTITY_RESET, entity.id),
					icon: icon.reset(),
					title: 'Reset entity value'
				})
			]),
			(entity.value && ['code', ['pre', JSON.stringify(entity.value, null, '  ')]]),
			(meta && ['h3', ' meta data  ', [
				'button', {
					class: buttonStyle,
					onclick: () => {
						const value = JSON.parse(tempMeta)
						dispatch(GUI.ENTITY.SAVE_META, { id: entity.id, value })
					}
				}, 'Save'
			]]),
			(meta && ['code', ['pre', {
					contentEditable: true,
					onInput: e => tempMeta = e.target.textContent
				}, tempMeta]])
		],
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

	if (process.delta) {
		type = 'Delta ' + type
	}

	const el = ['section', {
			class: entityViewStyle
		},
		['div', { class: windowContentStyle },
			['table',
				['tr',
					['td', 'type'],
					['td', type]],
				['tr',
					['td', 'output'],
					['td', ['a', {
							onClick: () => dispatch(GUI.ENTITY.SET_ACTIVE_ENTITY, process.output)
						},
						printEntityName(graph.entities[process.output])]]],
				['tr',
					['td', 'inputs'],
					['td',
						...process.inputs
							.filter(i => i.type !== PORT_TYPES.ACCUMULATOR)
							.map(i => ['p', ['a', {
									onClick: () => dispatch(GUI.ENTITY.SET_ACTIVE_ENTITY, i.eid)
								},
								printEntityName(graph.entities[i.eid]) + ' :: ' + i.type]])]]
				]],
		getProcessButtons(process, dispatch)]

	return el
}
