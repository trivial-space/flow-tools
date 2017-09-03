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
	[runtime.COLD, activeEntity.HOT, visibility.HOT, watchingEntity.HOT],
	(send, flow, entity, visibility, watching) => {
		if (entity && entity.id) {
			const value = flow.get(entity.id)
			send(value)
			if (visibility.entity && watching) {
				flow.on(entity.id, send)
				return () => flow.off(entity.id, send)
			}
		} else {
			send('')
		}
	}
)


export const entityValueView = stream(
	[activeValue.HOT, watchingEntity.HOT],
	(value, watching) => ({ value, watching })
)
.val({ value: null, watching: true })


export const entityViewProps = stream(
	[activeEntity.HOT, watchingEntity.HOT],
	(entity, watching) => ({ entity, watching })
)
