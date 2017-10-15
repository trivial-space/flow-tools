import { Entity, Graph, PORT_TYPES, PortType, Process } from 'tvs-flow/dist/lib/runtime-types'


export function createEntityTree(entities: {[id: string]: ProcessedGraphEntity}, separator = '.') {

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


export type ProcessedGraphProcesses = Process & {
	reaction: boolean,
	entities: Array<{eid: string, type: PortType}>
}

export interface ProcessedGraphEntity extends Entity {
	name: string,
	namespace: string,
	processes: ProcessedGraphProcesses[]
}


export function processEntities(graph: Graph) {
	const entities: {[id: string]: ProcessedGraphEntity} = {}

	for (const eid in graph.entities) {
		const e = graph.entities[eid]
		const ns = getLabelGroup(eid)
		entities[eid] = {
			...e,
			name: ns.label,
			namespace: ns.group,
			processes: getProcessesOfEntity(e, graph)
		}
	}

	return entities
}


export function getProcessesOfEntity(entity: Entity, graph: Graph): ProcessedGraphProcesses[] {

	return Object.values(graph.arcs)
		.filter(arc => arc.entity === entity.id && arc.port == null)
		.map(arc => {
			const p = graph.processes[arc.process]

			const acc = (p.ports as PortType[]).indexOf(PORT_TYPES.ACCUMULATOR)
			const startEntities: Array<{eid: string, type: PortType}> = []
			if (acc >= 0) startEntities[acc] = {eid: entity.id, type: PORT_TYPES.ACCUMULATOR}
			return {
				...p,
				reaction: acc >= 0,
				entities: Object.values(graph.arcs)
					.filter(a => a.process === p.id && a.port != null)
					.reduce((acc, a) => {
						acc[a.port as number] = {
							eid: a.entity,
							type: p.ports[a.port as number]
						}
						return acc
					}, startEntities)
					.filter(e => e.eid !== entity.id)
			}
		})
}
