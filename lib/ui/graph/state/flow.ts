import { val, stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Runtime, Graph } from 'tvs-flow/dist/lib/runtime-types'
import { createEntityTree } from '../../../utils/entity-tree'
import { action } from '../events'
import { defined } from 'tvs-libs/dist/lib/utils/predicates'
import { FLOW } from '../../actions'


export const runtime: EntityRef<Runtime> = val(null as any as Runtime)
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


export const graph: EntityRef<Graph> = stream(
	[runtime.HOT],
	(flow: Runtime) => flow.getGraph()
)


export const state = stream(
	[runtime.HOT],
	(flow: Runtime) => flow.getState()
)


export const entityTree = stream(
	[graph.HOT],
	graph => createEntityTree(graph.entities)
)
