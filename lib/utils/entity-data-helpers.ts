import { Entity, Graph, PORT_TYPES, PortType, Process } from 'tvs-flow/dist/lib/runtime-types'


export function createEntityTree (entities: { [id: string]: ProcessedGraphEntity }, separator = '.') {

	const tree = {} as any

	Object.keys(entities).sort().forEach(eid => {

		const entity = entities[eid] as Entity
		const parts = entity.id.split(separator)

		let subtree = tree
		const steps = [...parts]
		const path: string[] = []

		parts.forEach(() => {
			const p = steps.shift() as string
			if (!steps.length) {
				subtree[p] = {
					__entity__: entity
				}
			} else {
				path.push(p)
				subtree = subtree[p] = subtree[p] || {
					__path__: path.join(separator)
				}
			}
		})
	})

	return tree
}


function getLabelGroup (id) {
	const path = id.split('.')
	const label = path.pop()
	const group = path.join('.')
	return { label, group }
}


export type ProcessedGraphProcess = Process & {
	reaction: boolean
	name: string
	namespace: string
	output: string
	inputs: Array<{ eid: string, type: PortType }>
}

export interface ProcessedGraphEntity extends Entity {
	name: string,
	namespace: string,
	processes: string[]
}

export interface ProcessedGraph {
	processes: { [id: string]: ProcessedGraphProcess }
	entities: { [id: string]: ProcessedGraphEntity }
}


export function processGraph (graph: Graph): ProcessedGraph {
	const entities: { [id: string]: ProcessedGraphEntity } = {}
	const processes: { [id: string]: ProcessedGraphProcess } = {}

	for (const eid in graph.entities) {
		const e = graph.entities[eid]
		const ns = getLabelGroup(eid)
		entities[eid] = {
			...e,
			name: ns.label,
			namespace: ns.group,
			processes: Object.values(graph.arcs)
				.filter(arc => arc.entity === e.id && arc.port == null)
				.map(arc => arc.process)
		}
	}

	for (const pid in graph.processes) {
		const p = graph.processes[pid]
		const ns = getLabelGroup(pid.split('::').shift())
		const acc = (p.ports as PortType[]).indexOf(PORT_TYPES.ACCUMULATOR)
		const startEntities: Array<{ eid: string, type: PortType }> = []
		const outArc = Object.values(graph.arcs).find(a => a.process === pid && a.port == null)
		const outEntity = outArc && outArc.entity
		if (acc >= 0 && outEntity) {
			startEntities[acc] = { eid: outEntity, type: PORT_TYPES.ACCUMULATOR }
		}

		processes[pid] = {
			...p,
			name: ns.label,
			namespace: ns.group,
			reaction: acc >= 0,
			output: outEntity,
			inputs: Object.values(graph.arcs)
				.filter(a => a.process === pid && a.port != null)
				.reduce((acc, a) => {
					acc[a.port as number] = {
						eid: a.entity,
						type: p.ports[a.port as number]
					}
					return acc
				}, startEntities)
		} as ProcessedGraphProcess
	}

	return { entities, processes }
}


export function printEntityName (e: ProcessedGraphEntity | ProcessedGraphProcess) {
	return e.name
		? e.namespace + ' / ' + e.name
		: e.id || 'No entity selected'
}
