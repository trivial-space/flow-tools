import * as icon from './icons'
import { iconBtn } from './ui'
import { buttonStyle } from './styles/ui'
import { windowContentStyle, entityViewStyle } from './styles/components'
import { GUI, FLOW } from '../actions'


function jsonCode (entityValue, watching, editingValue) {
	let code = ''
	if (entityValue) {
		try {
			code = JSON.stringify(entityValue, null, '  ')
		} catch (e) {
			code = 'Error: ' + e.message
		}
	}

	return ['code',
		['pre', {
				contentEditable: !watching,
				onInput: e => editingValue.value = e.target.textContent
			},
			code]]
}


export function entityView ({entity, watching}, dispatch) {
	const editingValue = {value: entity.value}
	const buttons: any = ['div', {
		'style': 'margin-top: 4px'
	}]

	if (watching) {

		buttons.push(
			['button', {
					class: buttonStyle,
					key: 'edit-btn',
					onclick: () => dispatch(GUI.ENTITY.WATCH_ACTIVE_ENTITY, true)
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
					onclick: () => dispatch(GUI.ENTITY.WATCH_ACTIVE_ENTITY, false)
				}, 'Cancel'],
			['button', {
					class: buttonStyle,
					key: 'save-btn-' + entity.id,
					onclick: () => dispatch(GUI.ENTITY.SAVE_VALUE, editingValue.value)
				}, 'Save']
		)
	}

	const el =
		['section', {
				class: entityViewStyle
			},
			['div', { class: windowContentStyle },
				jsonCode(entity.value, watching, editingValue)],
			buttons]

	return el
}


export function processView (process, dispatch) {
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

	return ['section', {
			class: entityViewStyle
		},
		['div', { class: windowContentStyle },
			['code',
				['pre', process.procedure.toString()]]],
		buttons]
}

