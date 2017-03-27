import { val, asyncStreamStart, asyncStream } from "tvs-flow/dist/lib/utils/entity-reference";
import { Action } from "utils/yoyo";
import {windowSize as getWindowSize} from 'tvs-libs/dist/lib/events/dom'
import { mouse as getMouse, MouseState } from 'tvs-libs/dist/lib/events/mouse'


export const action = val<Action>()

export const windowSize = asyncStreamStart(getWindowSize)

export const element = val<HTMLElement>()

export const mouse = asyncStream<MouseState>(
  [element.HOT],
  (send, el) => getMouse(send, {el, enableRightButton: true})
)
