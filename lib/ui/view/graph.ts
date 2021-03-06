import { graphViewStyle } from './styles/graph'
import { classes } from 'typestyle/lib'
import { GUI } from '../actions'
import { getDragDeltas } from '../../utils/component-helpers'


export function scaleSlider ({ scale }, dispatch) {
	return ['span',
		['input', {
			type: 'range',
			value: scale,
			min: 0.5,
			max: 3,
			step: 0.2,
			onchange: e => dispatch(GUI.GRAPH.UPDATE_SCALE, e.target.value),
			onmousemove: e => e.stopPropagation()
		}]]
}


export function graphView (data, dispatch) {

	if (!data) return ['section', { class: graphViewStyle }]

	const { entities, processes, edges, viewBox = {} as any } = data
	return ['section', { class: graphViewStyle },
		['svg', {
				width: '100%',
				height: '100%',
				id: 'graph-ui',
				viewBox: `${viewBox.x}, ${viewBox.y}, ${viewBox.width}, ${viewBox.height}`,
				...getDragDeltas(
					d => dispatch(GUI.GRAPH.MOVE_VIEWPORT, d),
					e => {
						if (e && e.button === 2 && e.target === e.currentTarget) {
							dispatch(GUI.ENTITY.RESET_ACTIVE_NODE)
						}
					}
				),
				oncontextmenu: e => e.preventDefault()
			},
			...edges.map(e =>
				['line', {
						x1: e.from.x,
						y1: e.from.y,
						x2: e.to.x,
						y2: e.to.y,
						class: classes(e.class, e.active && 'active')
					}]),
			...processes.map(p =>
				['circle', {
						class: classes(p.class, p.active && 'active'),
						transform: `translate(${p.x}, ${p.y})`,
						onmousedown: () => dispatch(GUI.ENTITY.SET_ACTIVE_PROCESS, p.id),
						cx: 0,
						cy: 0,
						r: p.autostart ? 13 : 8,
						title: p.id
					}]),
			...entities.map(e =>
				['g', {
						'data-eid': e.id,
						transform: `translate(${e.x}, ${e.y})`,
						title: e.id,
						class: classes(e.class, e.active && 'active'),
						...getDragDeltas(d => dispatch(GUI.GRAPH.MOVE_ENTITY_POSITION, {
							start: e,
							delta: d
						}), () => dispatch(GUI.ENTITY.SET_ACTIVE_ENTITY, e.id))
					},
					['rect', {
							x: -15,
							y: -15,
							width: 30,
							height: 30,
							class: e.accept ? 'accept' : ''
						}],
					['text', {
							'text-anchor': 'middle',
							x: 0,
							y: 30
						},
						e.label],
					e.initial && ['circle', {
							cx: 0,
							cy: 0,
							r: 6,
							class: 'initial'
						}]])
		]]
}
