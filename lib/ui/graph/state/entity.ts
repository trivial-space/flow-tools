import { val, stream, asyncStream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Entity, Process } from 'tvs-flow/dist/lib/runtime-types'
import { unequal, defined, and } from 'tvs-libs/dist/lib/utils/predicates'
import { runtime, graph, metaEntity } from './flow'
import { visibility } from './gui'


export const activeEntityId = stream(
	[metaEntity.HOT],
	entity => entity.activeEntityId
)
.accept(and(defined, unequal))


export const activeProcessId = stream(
	[metaEntity.HOT],
	entity => entity.activeProcessId
)
.accept(and(defined, unequal))


export const activeEntity = stream(
	[activeEntityId.HOT, graph.COLD],
	(id, graph) => graph.entities[id] || ({id} as Entity)
)


export const activeProcess = stream(
	[activeProcessId.HOT, graph.COLD],
	(id, graph) => graph.processes[id] || ({id} as Process)
)


export const activeNode = val({})
.react([activeEntity.HOT], (_, e) => e)
.react([activeProcess.HOT], (_, p) => p)


export const watchingEntity = stream(
	[metaEntity.HOT],
	entity => entity.watchingEntity
)
.accept(and(defined, unequal))


export const activeValue: EntityRef<any> = asyncStream(
	[runtime.COLD, activeEntityId.HOT, visibility.HOT, watchingEntity.HOT],
	(send, flow, eid, visibility, watching) => {
		if (eid) {
			const value = flow.get(eid)
			send(value)
			if (visibility.entity && watching) {
				flow.on(eid, send)
				return () => flow.off(eid, send)
			}
		} else {
			send('')
		}
	}
)


export const entityViewProps = stream(
	[activeEntity.HOT, activeValue.HOT, watchingEntity.HOT],
	(entity, value, watching) => ({ entity, value, watching })
)
