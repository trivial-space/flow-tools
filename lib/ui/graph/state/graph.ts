import { stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { unequal } from 'tvs-libs/dist/lib/utils/predicates'
import { graph, metaGraph, metaEntities } from './flow'
import { PORT_TYPES, Graph, PortType } from 'tvs-flow/dist/lib/runtime-types'
import { graphWindow } from './gui'
import { activeNode } from './entity'
import { GraphViewBox, graphDefaultViewBox } from '../../types'


export const viewBox: EntityRef<GraphViewBox> = stream(
	[metaGraph.HOT],
	graph => (graph.viewBox || graphDefaultViewBox) as GraphViewBox
)
.accept(unequal)


export const entityPositions = stream(
	[graph.HOT],
	// Reset positions on new graph
	(_) => ({} as { [id: string]: { x: number, y: number } })
)
.react(
	[graphWindow.HOT, metaEntities.HOT, graph.COLD],
	(self, size, entities, graph) => {
		for (const eid in graph.entities) {
			const e = entities[eid]
			const pos = e && e.ui && e.ui.graph && e.ui.graph.position
			console.log(eid, pos)
			if (pos) {
				self[eid] = pos
			} else if (!self[eid]) {
				self[eid] = {
					x: Math.random() * size.width,
					y: Math.random() * size.height
				}
			}
		}
		return self
	}
)


// action.react(
// 	[activeEntityId.COLD, entityPositions.COLD, mouse.COLD, dragDeltas.HOT, viewBox.COLD],
// 	(_, id, positions, mouse, delta, viewBox) => {
// 		const t = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement
// 		const targetId = t && (t.dataset.eid || (t.parentElement && t.parentElement.dataset.eid))
// 		if (targetId
// 			&& id === targetId
// 			&& self[id]
// 			&& (delta.x || delta.y)
// 		) {
// 			return newAction(GUI.GRAPH.SET_ENTITY_POSITION, {
// 				eid: id,
// 				pos: {
// 					x: positions[id].x - delta.x * viewBox.scale,
// 					y: positions[id].y - delta.y * viewBox.scale
// 				}
// 			})
// 		}
// 	}
// )


function getLabelGroup (id) {
	const path = id.split('.')
	const label = path.pop()
	const group = path.join('.')
	return { label, group }
}


export const graphEntities = stream(
	[graph.HOT, activeNode.HOT],
	(graph, active) => {

		const entities: any = {}
		const groups: any = {}
		let groupNr = 0

		for (const key in graph.entities) {

			const e = graph.entities[key]

			const {label, group} = getLabelGroup(key)

			groups[group] = groups[group] || (groupNr++ % 7) + 1

			const node: any = {
				id: e.id,
				class: 'group-' + groups[group],
				label,
				active: e.id === active.id
			}

			if (e.accept != null) {
				node.accept = true
			}
			if (e.value != null) {
				node.initial = true
			}

			entities[key] = node
		}

		return entities
	}
)
.react(
	[entityPositions.HOT],
	(self, positions) => {
		for (const eid in positions) {
			self[eid].x = positions[eid].x
			self[eid].y = positions[eid].y
		}
		return self
	}
)


export const graphProcesses = stream(
	[graph.HOT, activeNode.HOT],
	(graph: Graph, active) => {

		const processes: any = {}

		for (const key in graph.processes) {

			const p = graph.processes[key]

			const node: any = {
				id: key,
				...getLabelGroup(key),
				from: [],
				async: p.async,
				autostart: p.autostart,
				active: p.id === active.id,
				acc: p.ports && (p.ports as PortType[]).includes(PORT_TYPES.ACCUMULATOR)
			}

			for (const akey in graph.arcs) {
				const a = graph.arcs[akey]
				if (a.process === key) {
					if (a.port != null) {
						node.from.push([a.entity, p.ports && p.ports[a.port]])
					} else {
						node.to = a.entity
					}
				}
			}

			processes[key] = node
		}

		return processes
	}
)


const pDistance = 50

export const viewData = stream(
	[graphEntities.HOT, graphProcesses.HOT],
	(entities, processes) => {

		const ps: any[] = []
		const edges: any[] = []

		for (const pid in processes) {
			const p = processes[pid]
			const to = entities[p.to]

			p.class = to.class

			if (p.from.length) {
				p.x = 0
				p.y = 0

				for (const [eid, type] of p.from) {
					const from = entities[eid]
					let x = from.x - to.x
					let y = from.y - to.y
					if (type === PORT_TYPES.COLD) {
						x /= 2
						y /= 2
					}
					p.x += x
					p.y += y
				}

				const l = Math.sqrt(p.x * p.x + p.y * p.y)
				p.x = pDistance * p.x / l + to.x
				p.y = pDistance * p.y / l + to.y

				for (const [eid, type] of p.from) {
					const from = entities[eid]
					p.fromIsActive = p.fromIsActive || from.active
					edges.push({
						from,
						to: p,
						class: 'from' + (type === PORT_TYPES.COLD ? ' cold' : ''),
						title: type,
						active: to.active || p.active || from.active
					})
				}

			} else {
				p.x = to.x
				p.y = to.y - pDistance
			}

			ps.push(p)

			edges.push({
				from: p,
				to,
				class: 'to' + (p.async ? ' async' : ''),
				active: to.active || p.active || p.fromIsActive
			})

			if (p.acc) {
				edges.push({
					from: p,
					to,
					class: 'to acc'
				})
			}
		}

		return {
			entities: Object.values(entities),
			processes: ps,
			edges
		}
	}
)
.react(
	[viewBox.HOT],
	(self: any, viewBox) => {
		self.viewBox = {
			x: viewBox.offsetX * viewBox.scale,
			y: viewBox.offsetY * viewBox.scale,
			width: viewBox.width * viewBox.scale,
			height: viewBox.height * viewBox.scale
		}
		return self
	}
)
