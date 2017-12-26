import { val, stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Runtime, Graph } from 'tvs-flow/dist/lib/runtime-types'
import { action, windowSize } from '../events'
import { unequal, not } from 'tvs-libs/dist/lib/utils/predicates'
import { FLOW, GUI } from '../../actions'
import { UIMeta, MetaFlow, PartialUIMetaEntity, PartialUIMetaTree, PartialUIMetaGraph, MetaEntitiesUI, UIMetaControls, guardMeta } from '../../types'
import { processGraph, ProcessedGraph } from '../../../utils/entity-data-helpers'
import * as deepEqual from 'fast-deep-equal'


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
.accept(unequal)


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


export const meta = stream(
	[runtime.HOT],
	runtime => runtime.getMeta() as UIMeta
)
.react(
	[action.HOT, runtime.COLD],
	(meta, { type, payload }, runtime) => {
		const flow = runtime as any as MetaFlow

		const ui = meta.ui
		const graph = ui && ui.graph
		const tree = ui && ui.tree
		const entity = ui && ui.entity
		const viewBox = graph && graph.viewBox
		const activeWindow = ui && ui.activeWindow

		switch (type) {

			case GUI.MAIN.SET_ACTIVE_WINDOW:
				return flow.setMeta({ ui: {
					activeWindow: payload
				}})

			case GUI.MAIN.UPDATE_VISIBILITY:
				const currentVisibilityState = ui && ui[payload]
				const currentVisibilityValue = currentVisibilityState && currentVisibilityState.window && currentVisibilityState.window.visible
				return flow.setMeta({ ui: {
					activeWindow: payload,
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

			case GUI.MAIN.MOVE_WINDOW:
				if (activeWindow) {
					const activeData = ui && ui[activeWindow]
					if (activeData && activeData.position) {
						const top = activeData.position.top - payload.y
						const left = activeData.position.left - payload.x
						return flow.setMeta(guardMeta({ ui: {
							controls: {
								position: { top, left }
							}
						} }))
					} else if (activeData) {
						const position = activeData.window && activeData.window.area
						if (position) {
							const top = position.top - payload.y
							const left = position.left - payload.x
							return flow.setMeta(guardMeta({ ui: {
								[activeWindow]: {
									window: {
										area: { top, left }
									}
								}
							} }))
						}
					}
				}
				break

			case GUI.MAIN.RESIZE_WINDOW:
				const area = activeWindow && ui && ui[activeWindow] && ui[activeWindow].window && ui[activeWindow].window.area
				if (area) {
					return flow.setMeta(guardMeta({ ui: {
						[activeWindow as string]: {
							window: {
								area: {
									width: area.width - payload.x,
									height: area.height - payload.y
								}
							}
						}
					} }))
				}
				break

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
					activeProcessId: '',
					watchingEntity: true
				} } })

			case GUI.ENTITY.SET_ACTIVE_PROCESS:
				return flow.setMeta({ ui: { entity: {
					activeProcessId: payload,
					activeEntityId: '',
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

			case GUI.ENTITY.SET_VIEW_MODE:
				return flow.setMeta({ ui: { entity: {
					viewMode: payload
				} } })

			case GUI.ENTITY.SAVE_META:
				return flow.setMeta({ entities: { [payload.id]: payload.value } })

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

			case GUI.GRAPH.MOVE_ENTITY_POSITION:
				if (entity && entity.activeEntityId) {
					const e = meta.entities && meta.entities[entity.activeEntityId]
					const pos = e && e.ui && e.ui.graph && e.ui.graph.position || payload.start
					const scale = graph && graph.viewBox && graph.viewBox.scale || 1
					if (pos) {
						return flow.setMeta({
							entities: {
								[entity.activeEntityId]: {
									ui: {
										graph: {
											position: {
												x: pos.x - payload.delta.x * scale,
												y: pos.y - payload.delta.y * scale
											}
										}
									}
								}
							}
						})
					}
				}
		}
	}
)
.react(
	[runtime.COLD, windowSize.HOT],
	(self, runtime, _) => runtime.setMeta(guardMeta(self))
)


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
.accept(not(deepEqual))

export const metaControls: EntityRef<UIMetaControls> = stream(
	[meta.HOT],
	meta => meta && meta.ui && meta.ui.controls
)
.accept(unequal)


export const graph: EntityRef<Graph> = stream(
	[runtime.HOT],
	flow => flow.getGraph()
)


export const enhancedGraphData: EntityRef<ProcessedGraph> = stream(
	[graph.HOT], processGraph
)
