import { val, asyncStreamStart, asyncStream } from "tvs-flow/dist/lib/utils/entity-reference";
import { Action } from "utils/yoyo";
import {windowSize as getWindowSize} from 'tvs-libs/dist/lib/events/dom'
import { mouse as getMouse, MouseState } from 'tvs-libs/dist/lib/events/mouse'


export const dispatch = val<Action>()

export const windowSize = asyncStreamStart(getWindowSize)

export const onDom = val<HTMLElement>()

export const mouse = asyncStream<MouseState>(
  [onDom.HOT],
  (send, element) => getMouse(send, {element, enableRightButton: true})
)
