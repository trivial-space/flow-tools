import { val, asyncStreamStart, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Action } from '../../utils/inferno'
import { windowSize as getWindowSize, WindowSizeState } from 'tvs-libs/dist/lib/events/dom'


export const windowSize: EntityRef<WindowSizeState> = asyncStreamStart(null, getWindowSize)

export const element = val<HTMLElement>()

export const action = val<Action>()
// .react(
// 	[mouse.HOT],
// 	(_, mouse) => {
// 		if (mouse.pressed[2] && (mouse.pressed[2].target as HTMLElement).closest('svg')) {
// 			return newAction(GUI.ENTITY.RESET_ACTIVE_NODE)
// 		}
// 	}
// )
// .react(
// 	[mouse.COLD, dragDeltas.HOT],
// 	(_, mouse, delta) => {
// 		const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement
// 		if (target && target.id === 'graph-ui'
// 				&& (delta.x || delta.y)) {
// 			return newAction(GUI.GRAPH.MOVE_VIEWPORT, delta)
// 		}
// 	}
// )
