import { stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { equalObject } from 'tvs-libs/dist/lib/utils/predicates'
import { graph, metaGraph, metaEntities, enhancedEntityData } from './flow'
import { PORT_TYPES } from 'tvs-flow/dist/lib/runtime-types'
import { activeNode } from './entity'
import { GraphViewBox, graphDefaultViewBox } from '../../types'


export const viewBox: EntityRef<GraphViewBox> = stream(
	[metaGraph.HOT],
	graph => (graph.viewBox || graphDefaultViewBox) as GraphViewBox
)
.accept((v1, v2) => !v2 || !equalObject(v1 as any, v2 as any))


export const entityPositions = stream(
	[graph.HOT],
	// Reset positions on new graph
	(_) => ({} as { [id: string]: { x: number, y: number } })
)
.react(
	[metaEntities.HOT, graph.COLD],
	(self, entities, graph) => {
		for (const eid in graph.entities) {
			const e = entities[eid]
			const pos = e && e.ui && e.ui.graph && e.ui.graph.position
			if (pos) {
				self[eid] = pos
			} else if (!self[eid]) {
				self[eid] = {
					x: Math.random() * 800,
					y: Math.random() * 800
				}
			}
		}
		return self
	}
)


const pDistance = 50

export const graphData = stream(
	[enhancedEntityData.HOT, activeNode.HOT, entityPositions.HOT],
	(entityData, active, positions) => {

		const groups: any = {}
		let groupNr = 0

		const processes: any[] = []
		const entities: any[] = []
		const edges: any[] = []

		for (const eid in entityData) {

			const e = entityData[eid]

			groups[e.namespace] = groups[e.namespace] || (groupNr++ % 7) + 1

			const eNode: any = {
				...positions[eid],
				id: e.id,
				class: 'group-' + groups[e.namespace],
				label: e.name,
				active: e.id === active.id
			}

			if (e.accept != null) {
				eNode.accept = true
			}

			if (e.value != null) {
				eNode.initial = true
			}

			entities.push(eNode)

			for (const p of e.processes) {

				const pNode: any = {
					id: p.id,
					async: p.async,
					autostart: p.autostart,
					active: p.id === active.id,
					acc: p.reaction,
					from: p.entities,
					to: eid,
					class: eNode.class
				}

				if (p.entities.length) {
					pNode.x = 0
					pNode.y = 0

					for (const { eid, type } of p.entities) {
						const fromPos = positions[eid]
						if (fromPos) {
							let x = fromPos.x - eNode.x
							let y = fromPos.y - eNode.y
							if (type === PORT_TYPES.COLD) {
								x /= 2
								y /= 2
							}
							pNode.x += x
							pNode.y += y
						}

						pNode.fromIsActive = pNode.fromIsActive || eid === active.id

						edges.push({
							from: fromPos,
							to: pNode,
							class: 'from' + (type === PORT_TYPES.COLD ? ' cold' : ''),
							title: type,
							active: eNode.active || pNode.active || eid === active.id
						})
					}

					const l = Math.sqrt(pNode.x * pNode.x + pNode.y * pNode.y)
					pNode.x = pDistance * pNode.x / l + eNode.x
					pNode.y = pDistance * pNode.y / l + eNode.y

				} else {
					pNode.x = eNode.x
					pNode.y = eNode.y - pDistance
				}

				processes.push(pNode)

				edges.push({
					from: pNode,
					to: eNode,
					class: 'to' + (p.async ? ' async' : ''),
					active: eNode.active || pNode.active || pNode.fromIsActive
				})

				if (p.reaction) {
					edges.push({
						from: pNode,
						to: eNode,
						class: 'to acc'
					})
				}
			}
		}

		return {
			entities,
			processes,
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
