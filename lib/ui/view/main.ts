import { style, classes } from 'typestyle'
import { Component, ComponentClass } from '../../utils/inferno'
import * as icon from './icons'
import { highlightColor, mainStyle } from './styles/main'
import { iconBtn } from './ui'
import { windowContentStyle, controlsStyle, windowStyle } from './styles/components'
import { graphView, scaleSlider } from './graph'
import { processView, entityView } from './entity'
import { treeView } from './tree'
import { iconButtonLightStyle } from './styles/ui'
import { GUI } from '../actions'
import { visibility } from '../graph/state/gui'
import { controlProps, entityWindowProps, graphWindowProps, treeWindowProps } from '../graph/state/views'
import { viewBox, viewData } from '../graph/state/graph'
import { entityViewProps } from '../graph/state/entity'
import { treeData } from '../graph/state/tree'
import { selectedRuntimeId } from 'ui/graph/state/flow'


function titleView (title) {
	return ['h1', title]
}


const activeButton = style({
	color: highlightColor
})


function setActiveWindow(label, dispatch) {
	return () => dispatch(GUI.MAIN.SET_ACTIVE_WINDOW, label)
}


function controls({visibility, position}, dispatch, component) {

	const click =
		label =>
			() => dispatch(GUI.MAIN.UPDATE_VISIBILITY, label)

	const el =
		['header', {
				class: classes('tvs-flow-controls', controlsStyle),
				onmousedown: setActiveWindow('controls', dispatch),
				style: {...position}
			},
			component(titleView, selectedRuntimeId),
			['nav', {class: 'tvs-controls-btns'},
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
						})]]]]

	return el
}


function treeWindow ({dimensions, window}, dispatch, component) {
	const el =
		['article', {
				class: classes('tvs-flow-tree', windowStyle),
				style: {...dimensions},
				onmousedown: setActiveWindow('tree', dispatch)
			},
			['header',
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
			['footer', { class: 'resize' }]]

	return el
}


function graphWindow ({dimensions, window}, dispatch, component) {

	const graph = component(graphView, viewData)

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

	const el =
		['article', {
				ref: updateGraphSize,
				class: classes('tvs-flow-graph', windowStyle),
				style: {...dimensions},
				onmousedown: setActiveWindow('graph', dispatch)
			},
			['header',
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
			['footer', { class: 'resize' }]]

	return el
}


function entityWindow ({dimensions, node, window}, dispatch, component) {
	const view = node && node.procedure
		? processView(node, dispatch)
		: component(entityView, entityViewProps)

	const el =
		['article', {
				class: classes('tvs-flow-entity', windowStyle),
				style: {...dimensions},
				onmousedown: setActiveWindow('entity', dispatch)
			},
			['header',
				icon.entity(window === 'entity' ? 'selected' : ''),
				' ',
				node && node.id,
				' ',
				['span', {class: 'gap'}, ' '],
				' ',
				iconBtn({
					icon: icon.close(),
					class: iconButtonLightStyle,
					title: 'close window',
					onclick: () => dispatch(GUI.MAIN.CLOSE_WINDOW, 'entity')
				})],
			view,
			['footer', { class: 'resize' }]]

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
