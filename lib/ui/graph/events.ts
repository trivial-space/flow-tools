import { val, asyncStreamStart, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { Action } from '../../utils/inferno'
import { windowSize as getWindowSize, WindowSizeState } from 'tvs-libs/dist/lib/events/dom'


export const windowSize: EntityRef<WindowSizeState> = asyncStreamStart(null, getWindowSize)

export const element = val<HTMLElement>()

export const action = val<Action>()
