import { val, stream, asyncStream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { unequal } from 'tvs-libs/dist/lib/utils/predicates'
import { runtime, metaEntity, enhancedGraphData } from './flow'
import { visibility } from './gui'
import { ProcessedGraphEntity, ProcessedGraphProcess } from '../../../utils/entity-tree'


export const activeEntityId = stream(
	[metaEntity.HOT],
	entity => entity.activeEntityId
)
.accept(unequal)


export const activeProcessId = stream(
	[metaEntity.HOT],
	entity => entity.activeProcessId
)
.accept(unequal)


export const activeEntity = stream(
	[activeEntityId.HOT, enhancedGraphData.COLD],
	(id, graph) => graph.entities[id] || ({id} as ProcessedGraphEntity)
)


export const activeProcess = stream(
	[activeProcessId.HOT, enhancedGraphData.COLD],
	(id, graph) => graph.processes[id] || ({id} as ProcessedGraphProcess)
)


export const activeNode = val({id: ''})
.react([activeProcess.HOT, activeEntity.HOT], (_, p, e) => p.id ? p : e)


export const watchingEntity = stream(
	[metaEntity.HOT],
	entity => entity.watchingEntity
)
.accept(unequal)


export const activeValue: EntityRef<any> = asyncStream(
	[runtime.COLD, activeEntityId.HOT, visibility.HOT, watchingEntity.HOT],
	(send, flow, eid, visibility, watching) => {
		if (eid) {
			const value = flow.get(eid)
			send(value === undefined ? null : value)
			if (visibility.entity && watching) {
				flow.on(eid, send)
				return () => flow.off(eid, send)
			}
		} else {
			send(null)
		}
	}
)


export const entityViewProps = stream(
	[activeEntity.HOT, activeValue.HOT, watchingEntity.HOT],
	(entity, value, watching) => ({ entity, value, watching })
)
