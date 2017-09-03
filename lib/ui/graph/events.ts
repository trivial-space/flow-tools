import { val, asyncStreamStart, asyncStream, EntityRef, delta, stream } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Action } from '../../utils/inferno'
import { windowSize as getWindowSize, WindowSizeState } from 'tvs-libs/dist/lib/events/dom'
import { mouse as getMouse, MouseState } from 'tvs-libs/dist/lib/events/mouse'
import { GUI, newAction } from '../actions'


export const windowSize: EntityRef<WindowSizeState> = asyncStreamStart(null, getWindowSize)

export const element = val<HTMLElement>()

export const mouse: EntityRef<MouseState> = asyncStream(
	[element.HOT],
	(send, el) => getMouse(send, {el, enableRightButton: true})
)

export const mouseDrag = stream(
	[mouse.HOT], m => ({
		x: m.drag.x,
		y: m.drag.y
	})
)


export const dragDeltas = delta(mouseDrag, (n, o) => ({
	x: n.x === 0 ? n.x : n.x - o.x,
	y: n.y === 0 ? n.y : n.y - o.y
}))
.accept(drag => !!(drag && (drag.x || drag.y)))


export const action = val<Action>()
.react(
	[mouse.HOT],
	(_, mouse) => {
		if (mouse.pressed[2] && (mouse.pressed[2].target as HTMLElement).closest('svg')) {
			return newAction(GUI.ENTITY.RESET_ACTIVE_NODE)
		}
	}
)
.react(
	[mouse.COLD, dragDeltas.HOT],
	(_, mouse, delta) => {
		const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement
		if (target && target.id === 'graph-ui'
				&& (delta.x || delta.y)) {
			return newAction(GUI.GRAPH.MOVE_VIEWPORT, delta)
		}
	}
)
