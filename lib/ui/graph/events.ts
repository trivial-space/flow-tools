import { val, asyncStreamStart, asyncStream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Action } from '../../utils/inferno'
import { windowSize as getWindowSize, WindowSizeState } from 'tvs-libs/dist/lib/events/dom'
import { mouse as getMouse, MouseState } from 'tvs-libs/dist/lib/events/mouse'


export const action: EntityRef<Action> = val()

export const windowSize: EntityRef<WindowSizeState> = asyncStreamStart(getWindowSize)

export const element = val<HTMLElement>()

export const mouse = asyncStream<MouseState>(
	[element.HOT],
	(send, el) => getMouse(send, {el, enableRightButton: true})
)
