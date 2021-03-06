import { style, classes } from 'typestyle'
import { Component, ComponentClass } from '../../utils/inferno'
import * as icon from './icons'
import { highlightColor, mainStyle } from './styles/main'
import { iconBtn } from './ui'
import { windowContentStyle, controlsStyle, windowStyle } from './styles/components'
import { graphView, scaleSlider } from './graph'
import { processValueView, entityValueView, processDetailsView, entityDetailsView } from './entity'
import { treeView } from './tree'
import { iconButtonLightStyle, buttonStyle } from './styles/ui'
import { GUI } from '../actions'
import { visibility } from '../graph/state/gui'
import { controlProps, entityWindowProps, graphWindowProps, treeWindowProps, processViewProps, entityViewProps } from '../graph/state/views'
import { viewBox, graphData } from '../graph/state/graph'
import { activeNode } from '../graph/state/entity'
import { treeData } from '../graph/state/tree'
import { getDragDeltas } from '../../utils/component-helpers'
import { EntityViewMode } from '../../ui/types'
import { printEntityName } from '../../utils/entity-data-helpers'


// function titleView (title, dispatch) {
// 	function move (delta) {
// 		dispatch(GUI.MAIN.MOVE_WINDOW, delta)
// 	}
// 	return ['h1', {...getDragDeltas(move)}, title]
// }


function entityName (entity, dispatch) {
	function move (delta) {
		dispatch(GUI.MAIN.MOVE_WINDOW, delta)
	}
	return ['h2', {...getDragDeltas(move)}, printEntityName(entity)]
}


function resizeFooter (dispatch) {
	function resize (delta) {
		dispatch(GUI.MAIN.RESIZE_WINDOW, delta)
	}
	return ['footer', {...getDragDeltas(resize), class: 'resize' }]
}


const activeButton = style({
	color: highlightColor
})


function setActiveWindow(label, dispatch) {
	return () => dispatch(GUI.MAIN.SET_ACTIVE_WINDOW, label)
}


function controls({visibility, position}, dispatch, component) {

	function move (delta) {
		dispatch(GUI.MAIN.MOVE_WINDOW, delta)
	}
	const click =
		label =>
			() => dispatch(GUI.MAIN.UPDATE_VISIBILITY, label)

	const el =
		['header', {
				class: classes('tvs-flow-controls', controlsStyle),
				onmousedown: setActiveWindow('controls', dispatch),
				style: {...position}
			},
			['nav', {
					class: 'tvs-controls-btns',
					...getDragDeltas(move)
				},
				['ul',
					['li',
						iconBtn({
							class: visibility.tree && activeButton,
							onclick: click('tree'),
							icon: icon.list(),
							title: 'toggle entity tree'
						})],
					['li',
						iconBtn({
							class: visibility.graph && activeButton,
							onclick: click('graph'),
							icon: icon.graph(),
							title: 'toggle flow graph'
						})],
					['li',
						iconBtn({
							class: visibility.entity && activeButton,
							onclick: click('entity'),
							icon: icon.entity(),
							title: 'toggle entity details'
						})]
					]
			],
			component(entityName, activeNode)
		]

	return el
}


function treeWindow ({dimensions, window}, dispatch, component) {

	function move (delta) {
		dispatch(GUI.MAIN.MOVE_WINDOW, delta)
	}

	const el =
		['article', {
				class: classes('tvs-flow-tree', windowStyle),
				style: {...dimensions},
				onmousedown: setActiveWindow('tree', dispatch)
			},
			['header',
				{ ...getDragDeltas(move) },
				icon.list(window === 'tree' ? 'selected' : ''),
				' Tree ',
				['span', {class: 'gap'}],
				' ',
				iconBtn({
					icon: icon.close(),
					class: iconButtonLightStyle,
					title: 'close window',
					onclick: () => dispatch(GUI.MAIN.CLOSE_WINDOW, 'tree')
				})],
			['section', {class: windowContentStyle}, component(treeView, treeData)],
			resizeFooter(dispatch)]

	return el
}


function graphWindow ({dimensions, window}, dispatch, component) {

	const graph = component(graphView, graphData)

	function updateGraphSize (parent) {
		if (parent && parent.querySelector) {
			const graphNode = parent.querySelector('section')
			requestAnimationFrame(() => {
				dispatch(GUI.GRAPH.UPDATE_SIZE, {
					width: graphNode.clientWidth,
					height: graphNode.clientHeight
				})
			})
		}
	}

	function move (delta) {
		dispatch(GUI.MAIN.MOVE_WINDOW, delta)
	}

	const el =
		['article', {
				ref: updateGraphSize,
				class: classes('tvs-flow-graph', windowStyle),
				style: {...dimensions},
				onmousedown: setActiveWindow('graph', dispatch)
			},
			['header',
				{ ...getDragDeltas(move) },
				icon.graph(window === 'graph' ? 'selected' : ''),
				' Graph ',
				['span', {class: 'gap'}],
				component(scaleSlider, viewBox),
				' ',
				iconBtn({
					icon: icon.copy(),
					class: classes(iconButtonLightStyle, 'tvs-save-graph'),
					title: 'copy the current graph state to clipboard'
				}),
				iconBtn({
					icon: icon.close(),
					class: iconButtonLightStyle,
					title: 'close window',
					onclick: () => dispatch(GUI.MAIN.CLOSE_WINDOW, 'graph')
				})],
			graph,
			resizeFooter(dispatch)]

	return el
}


function entityWindow ({dimensions, node, window, viewMode}, dispatch, component) {
	viewMode = viewMode || EntityViewMode.VALUE

	const isProcess = node && node.procedure
	const isValueMode = viewMode === EntityViewMode.VALUE

	const view = isValueMode
		? isProcess
			? component(processValueView, processViewProps)
			: component(entityValueView, entityViewProps)
		: isProcess
			? component(processDetailsView, processViewProps)
			: component(entityDetailsView, entityViewProps)

	function move (delta) {
		dispatch(GUI.MAIN.MOVE_WINDOW, delta)
	}

	const el =
		['article', {
				class: classes('tvs-flow-entity', windowStyle),
				style: {...dimensions},
				onmousedown: setActiveWindow('entity', dispatch)
			},
			['header',
				{ ...getDragDeltas(move) },
				icon.entity(window === 'entity' ? 'selected' : ''),
				isProcess ? ' Process ' : ' Entity ',
				['span', {class: 'gap'}, ' '],
				['button', {
					class: classes(buttonStyle, 'tiny', viewMode === EntityViewMode.VALUE && 'selected'),
					onClick: () => dispatch(GUI.ENTITY.SET_VIEW_MODE, EntityViewMode.VALUE)
				}, 'value'],
				['button', {
					class: classes(buttonStyle, 'tiny', viewMode === EntityViewMode.DETAILS && 'selected'),
					onClick: () => dispatch(GUI.ENTITY.SET_VIEW_MODE, EntityViewMode.DETAILS)
				}, 'details'],
				iconBtn({
					icon: icon.close(),
					class: iconButtonLightStyle,
					title: 'close window',
					onclick: () => dispatch(GUI.MAIN.CLOSE_WINDOW, 'entity')
				})],
			view,
			resizeFooter(dispatch)]

	return el
}


function root (visibility, _, component) {

	const tree = visibility.tree ? component(treeWindow, treeWindowProps) : ''
	const graph = visibility.graph ? component(graphWindow, graphWindowProps) : ''
	const entity = visibility.entity ? component(entityWindow, entityWindowProps) : ''

	const el = ['article', {class: classes('tvs-flow-tools', mainStyle)},
		component(controls, controlProps),
		graph,
		entity,
		tree
	]

	return el
}


export function mainView (component: Component): ComponentClass {
	return component(root, visibility)
}
