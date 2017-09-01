import { val, stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Runtime, Graph } from 'tvs-flow/dist/lib/runtime-types'
import { createEntityTree } from '../../../utils/entity-tree'
import { action } from '../events'
import { defined, unequal, and } from 'tvs-libs/dist/lib/utils/predicates'
import { FLOW, GUI } from '../../actions'
import { UIMeta, MetaFlow } from '../../types'


export const runtimes = val<{[id: string]: Runtime}>({})


export const selectedRuntime = val<string>()
.react(
	[action.HOT],
	(_, action) => {
		if (action.type === FLOW.SELECT_ACTIVE_RUNTIME) {
			return action.payload
		}
	}
)
.accept(and(defined, unequal))


export const runtime = stream<Runtime, {[id: string]: Runtime}, string>(
	[runtimes.HOT, selectedRuntime.HOT],
	(runtimes, id) => {
		if (id) return runtimes[id]
		const labels = Object.keys(runtimes)
		if (labels.length) return runtimes[labels[0]]
	}
)
.react(
	[action.HOT],
	(self: Runtime, {type, payload}) => {
		switch (type) {
			case FLOW.PROCESS_RUN:
				self.start(payload)
				return
			case FLOW.PROCESS_STOP:
				self.stop(payload)
				return
			case FLOW.ENTITY_RESET:
				self.set(payload, self.getGraph().entities[payload].value)
				return
			case FLOW.ENTITY_INSPECT:
				console.log(payload, self.get(payload))
				return
		}
	}
)
.accept(defined)


export const meta = stream(
	[runtime.HOT],
	runtime => runtime.getMeta() as UIMeta
)
.react(
	[action.HOT, runtime.COLD],
	(_, { type, payload }, runtime) => {
		const flow = runtime as any as MetaFlow

		switch (type) {

			case GUI.ENTITIES.SET_ACTIVE_ENTITY:
				return flow.setMeta({ ui: {
					activeEntityId: payload,
					watchingEntity: true
				} })

			case GUI.ENTITIES.SET_ACTIVE_PROCESS:
				return flow.setMeta({ ui: {
					activeProcessId: payload,
					watchingEntity: false
				} })

			case GUI.ENTITIES.RESET_ACTIVE_NODE:
				return flow.setMeta({ ui: {
					activeEntityId: '',
					activeProcessId: '',
					watchingEntity: false
				} })

			case GUI.ENTITIES.WATCH_ACTIVE_ENTITY:
				return flow.setMeta({ ui: {
					watchingEntity: payload
				} })
		}
	}
)
.accept(defined)


export const graph: EntityRef<Graph> = stream(
	[runtime.HOT],
	flow => flow.getGraph()
)


export const state = stream(
	[runtime.HOT],
	flow => flow.getState()
)


export const entityTree = stream(
	[graph.HOT],
	graph => createEntityTree(graph.entities)
)
