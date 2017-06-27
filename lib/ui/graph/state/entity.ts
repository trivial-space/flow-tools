import { val, stream, asyncStream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { unequal, defined, and } from 'tvs-libs/dist/lib/utils/predicates'
import { action, mouse } from '../events'
import { runtime, graph } from './flow'
import { Runtime, Entity } from 'tvs-flow/dist/lib/runtime-types'
import { GUI } from '../../actions'
import { visibility } from './gui'


export const activeEntity: EntityRef<Entity> = val({})
.react(
	[action.HOT, graph.COLD],
	(_, { type, payload }, graph) => {
		if (type === GUI.ENTITIES.OPEN_ENTITY) {
			return graph.entities[payload]
		}
	}
)
.react(
	[mouse.HOT],
	(_, mouse) => {
		if (mouse.pressed[2] && mouse.pressed[2].target.closest('svg')) {
			return { id: '' }
		}
	}
)
.accept(defined)


export const activeProcess = val({})
.react(
	[action.HOT, graph.COLD],
	(_, { type, payload }, graph) => {
		if (type === GUI.ENTITIES.OPEN_PROCESS) {
			return graph.processes[payload]
		}
	}
)
.react(
	[mouse.HOT],
	(_, mouse) => {
		if (mouse.pressed[2] && mouse.pressed[2].target.closest('svg')) {
			return { id: '' }
		}
	}
)
.accept(defined)


export const activeNode = val({})
.react([activeEntity.HOT], (_, e) => e)
.react([activeProcess.HOT], (_, p) => p)


export const watchingEntity = val(true)
.react(
	[action.HOT],
	(_, { type, payload }) => {
		if (type === GUI.ENTITIES.SET_EDIT_MODE) {
			return !payload
		} else if (type === GUI.ENTITIES.SAVE_VALUE) {
			return true
		}
	}
)
.react([activeEntity.HOT], () => true)
.accept(defined)


export const activeValue = asyncStream(
	[runtime.COLD, activeEntity.HOT, visibility.HOT, watchingEntity.HOT],
	(send, flow: Runtime, entity, visibility, watching) => {
		if (entity && entity.id) {
			const value = flow.get(entity.id)
			send(value != null ? value : '')
			if (visibility.entities && watching) {
				flow.on(entity.id, send)
				return () => flow.off(entity.id, send)
			}
		} else {
			send('')
		}
	}
)


export const editedValue = val('')
	.react(
	[action.HOT, runtime.COLD],
	(self, { type, payload }, flow) => {
		if (type === GUI.ENTITIES.UPDATE_EDITED_VALUE) {
			return payload
		} else if (self && type === GUI.ENTITIES.SAVE_VALUE) {
			requestAnimationFrame(function() {
				try {
					flow.set(payload, JSON.parse(self))
				} catch (e) {
					console.error('could not save value to entity', payload, self)
					console.error(e)
				}
			})
		}
	}
	)
	.react([activeValue.HOT], () => '')
	.accept(and(defined, unequal))


export const entityValueView = stream(
	[activeValue.HOT, watchingEntity.HOT],
	(value, watching) => ({ value, watching })
).val({ value: null, watching: true })


export const entityViewProps = stream(
	[activeEntity.HOT, watchingEntity.HOT],
	(entity, watching) => ({ entity, watching })
)
