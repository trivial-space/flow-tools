import { val, stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Runtime, Graph } from 'tvs-flow/dist/lib/runtime-types'
import { action } from '../events'
import { defined, unequal, and } from 'tvs-libs/dist/lib/utils/predicates'
import { FLOW, GUI } from '../../actions'
import { UIMeta, MetaFlow, PartialUIMetaEntity, PartialUIMetaTree, PartialUIMetaGraph, MetaEntitiesUI } from '../../types'


export const runtimes = val<{[id: string]: Runtime}>({})
.react(
	[action.HOT],
	(self, action) => {
		if (action.type === FLOW.SET_RUNTIME) {
			return {
				...self,
				[action.payload.label]: action.payload.runtime
			}
		}
	}
)
.accept(defined)


export const selectedRuntimeId = val<string>('')
.react(
	[runtimes.HOT],
	(id, runtimes) => id || Object.keys(runtimes)[0]
)
.react(
	[action.HOT],
	(_, action) => {
		if (action.type === FLOW.SELECT_ACTIVE_RUNTIME) {
			return action.payload
		}
	}
)
.accept(and(defined, unequal))


export const runtime = stream(
	[runtimes.COLD, selectedRuntimeId.HOT],
	(runtimes, id) => runtimes[id]
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
	(meta, { type, payload }, runtime) => {
		const flow = runtime as any as MetaFlow

		const graph = meta.ui && meta.ui.graph
		const tree = meta.ui && meta.ui.tree
		const entity = meta.ui && meta.ui.entity
		const viewBox = graph && graph.viewBox

		switch (type) {

			case GUI.MAIN.UPDATE_VISIBILITY:
				const currentVisibilityState = meta.ui && meta.ui[payload]
				const currentVisibilityValue = currentVisibilityState && currentVisibilityState.window && currentVisibilityState.window.visible
				return flow.setMeta({ ui: {
					[payload]: {
						window: {
							visible: !currentVisibilityValue
						}
					}
				}})

			case GUI.MAIN.CLOSE_WINDOW:
				return flow.setMeta({ ui: {
					[payload]: {
						window: {
							visible: false
						}
					}
				}})

			case GUI.TREE.TOGGLE_LEVEL:
				const treeFold = tree && tree.fold || {}
				return flow.setMeta({ ui: {
					tree: {fold: {
						[payload]: !treeFold[payload]
					}}
				}})

			case GUI.ENTITY.SET_ACTIVE_ENTITY:
				return flow.setMeta({ ui: { entity: {
					activeEntityId: payload,
					watchingEntity: true
				} } })

			case GUI.ENTITY.SET_ACTIVE_PROCESS:
				return flow.setMeta({ ui: { entity: {
					activeProcessId: payload,
					watchingEntity: false
				} } })

			case GUI.ENTITY.RESET_ACTIVE_NODE:
				return flow.setMeta({ ui: { entity: {
					activeEntityId: '',
					activeProcessId: '',
					watchingEntity: false
				} } })

			case GUI.ENTITY.SAVE_VALUE:
				const currentEntityId = entity && entity.activeEntityId
				if (currentEntityId) {
					(flow as Runtime).set(currentEntityId, payload)
				}
				return flow.setMeta({ ui: { entity: {
					watchingEntity: true
				} } })

			case GUI.ENTITY.WATCH_ACTIVE_ENTITY:
				return flow.setMeta({ ui: { entity: {
					watchingEntity: payload
				} } })

			case GUI.GRAPH.MOVE_VIEWPORT:
				return flow.setMeta({ ui: { graph: {
					viewBox: {
						offsetX: (viewBox && viewBox.offsetX || 0) + payload.x,
						offsetY: (viewBox && viewBox.offsetY || 0) + payload.y
					}
				} }})

			case GUI.GRAPH.UPDATE_SCALE:
				return flow.setMeta({ ui: { graph: {
					viewBox: {
						scale: payload
					}
				} } })

			case GUI.GRAPH.UPDATE_SIZE:
				if (payload.width && payload.height) {
					return flow.setMeta({ ui: { graph: {
						viewBox: {
							width: payload.width,
							height: payload.height
						}
					} } })
				}
				return

			case GUI.GRAPH.SET_ENTITY_POSITION:
				return flow.setMeta({
					entities: {
						[payload.eid]: {
							ui: {
								graph: {
									position: payload.pos
								}
							}
						}
					}
				})
		}
	}
)
.accept(defined)

export const metaGraph: EntityRef<PartialUIMetaGraph> = stream(
	[meta.HOT],
	meta => meta && meta.ui && meta.ui.graph
)
.accept(unequal)

export const metaTree: EntityRef<PartialUIMetaTree> = stream(
	[meta.HOT],
	meta => meta && meta.ui && meta.ui.tree
)
.accept(unequal)

export const metaEntity: EntityRef<PartialUIMetaEntity> = stream(
	[meta.HOT],
	meta => meta && meta.ui && meta.ui.entity
)
.accept(unequal)

export const metaEntities: EntityRef<{[id: string]: { ui?: MetaEntitiesUI }}> = stream(
	[meta.HOT],
	meta => meta && meta.entities
)
.accept(unequal)


export const graph: EntityRef<Graph> = stream(
	[runtime.HOT],
	flow => flow.getGraph()
)


export const state = stream(
	[runtime.HOT],
	flow => flow.getState()
)

