import { val, asyncStreamStart, asyncStream, EntityRef, delta, stream } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Action } from '../../utils/inferno'
import { windowSize as getWindowSize, WindowSizeState } from 'tvs-libs/dist/lib/events/dom'
import { mouse as getMouse, MouseState } from 'tvs-libs/dist/lib/events/mouse'


export const action: EntityRef<Action> = val()

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
