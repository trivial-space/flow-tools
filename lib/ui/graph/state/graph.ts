import { stream, EntityRef, asyncStream, val } from 'tvs-flow/dist/lib/utils/entity-reference'
import { equalObject } from 'tvs-libs/dist/lib/utils/predicates'
import { metaGraph, metaEntities, enhancedEntityData, graph, runtime } from './flow'
import { PORT_TYPES } from 'tvs-flow/dist/lib/runtime-types'
import { activeNode } from './entity'
import { GraphViewBox, graphDefaultViewBox } from '../../types'
import { sub, normalize, length, mul, add } from 'tvs-libs/dist/lib/math/vectors'


export const viewBox: EntityRef<GraphViewBox> = stream(
	[metaGraph.HOT],
	graph => (graph.viewBox || graphDefaultViewBox) as GraphViewBox
)
	.accept((v1, v2) => !v2 || !equalObject(v1 as any, v2 as any))


export const simulationSteps = val(500)


export interface Positions { [id: string]: { x: number, y: number } }


export const initialPosition = stream(
	[graph.HOT],
	(graph) => {

		const positions = {} as Positions

		for (const eid in graph.entities) {
			positions[eid] = {
				x: Math.random() * 800,
				y: Math.random() * 800
			}
		}

		return positions
	}
)


export const entityPositions = asyncStream(
	[metaEntities.HOT, simulationSteps.HOT, enhancedEntityData.COLD, initialPosition.HOT],
	(send: (ps: Positions) => void, esMeta, steps, esData, positions) => {

		for (const eid in esMeta) {
			const e = esMeta[eid]
			const pos = e && e.ui && e.ui.graph && e.ui.graph.position
			if (pos) {
				positions[eid] = pos
			}
		}

		send(positions)

		const ids = Object.keys(esData)

		function simulateForces () {
			const forces = {} as { [id: string]: number[] }

			for (let i = 0; i < ids.length; i++) {
				const eid = ids[i]
				const e = esData[eid]
				const e1Pos = positions[eid]

				for (const p of e.processes) {
					for (const eP of p.entities) {
						const springLength = esData[eP.eid].namespace === e.namespace ? 200 : 300

						const e2Pos = positions[eP.eid]
						const vec = sub([e2Pos.x, e2Pos.y], [e1Pos.x, e1Pos.y])
						const dist = length(vec)
						const dir = normalize(vec)
						const diff = dist - springLength
						const force = eP.type === PORT_TYPES.COLD ? diff * 0.5 : diff * 2
						forces[eid] = add(forces[eid] || [0, 0], mul(dir, force))
						forces[eP.eid] = add(forces[eP.eid] || [0, 0], mul(dir, force * -1))
					}
				}

				for (let j = i + 1; j < ids.length; j++) {
					const eid2 = ids[j]
					const e2 = esData[eid2]
					const e2Pos = positions[eid2]

					const vec = sub([e2Pos.x, e2Pos.y], [e1Pos.x, e1Pos.y])
					const dist = length(vec)
					const dir = normalize(vec)
					const force = Math.max(100 - dist, 0)
					forces[eid] = add(forces[eid] || [0, 0], mul(dir, force * -1))
					forces[eid2] = add(forces[eid2] || [0, 0], mul(dir, force))

					if (e.namespace === e2.namespace) {
						const force = dist - 300
						forces[eid] = add(forces[eid] || [0, 0], mul(dir, force))
						forces[eid2] = add(forces[eid2] || [0, 0], mul(dir, force * -1))
					} else {
						const force = Math.max(300 - dist, 0)
						forces[eid] = add(forces[eid] || [0, 0], mul(dir, force * -1))
						forces[eid2] = add(forces[eid2] || [0, 0], mul(dir, force))
					}
				}
			}

			for (const eid in forces) {
				const force = forces[eid]
				const l = length(force)
				if (l > steps / 2) {
					const n = normalize(force)
					const pos = positions[eid]
					const [x, y] = add([pos.x, pos.y], mul(n, l / steps))
					positions[eid] = { x: Math.floor(x), y: Math.floor(y) }
				}
			}
		}

		let i = steps

		function animate () {
			if (i > 10) {

				const oldPositions: any = {}
				for (const eid in positions) {
					oldPositions[eid] = positions[eid]
				}

				for (let j = 10; j > 0; j--) {
					simulateForces()
					i--
				}

				let equals = true
				for (const eid in positions) {
					const o = oldPositions[eid]
					const n = positions[eid]
					if (o !== n && (o.x !== n.x || o.y !== n.y)) {
						equals = false
					}
				}

				if (!equals) {
					send(positions)
					if (i > 10) {
						setTimeout(animate, 60)
					}
				}
			}
		}

		requestAnimationFrame(animate)

		return function() { i = 0 }
	}
)


runtime.react(
	[entityPositions.HOT],
	(self, pos) => {
		const meta: any = {}
		for (const eid in pos) {
			meta[eid] = { ui: { graph: { position: pos[eid] } } }
		}
		self.setMeta({ entities: meta })
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
