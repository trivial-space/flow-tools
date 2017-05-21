import { val, stream, EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
import { unequal, defined, and, notEmpty } from "tvs-libs/dist/lib/utils/predicates";
import { action, mouse, windowSize } from "../events";
import { MouseState } from "tvs-libs/dist/lib/events/mouse";
import { GUI } from "ui/actions";


export interface Size {
  width: number
  height: number
}


export interface Position {
  top: number
  left: number
}


export type WindowDimension = Position & Size


export const title: EntityRef<string> = val('').accept(notEmpty)


export const visibility = val({
  tree: false,
  graph: false,
  entities: false,
})
.react(
  [action.HOT],
  (self, { type, payload }) => {
    if (type === GUI.MAIN.UPDATE_VISIBILITY) {
      return { ...self, [payload]: !self[payload] }

    } else if (type === GUI.MAIN.CLOSE_WINDOW) {
      return { ...self, [payload]: false }
    }
  }
)
.accept(defined)


export const activeWindow = stream(
  [action.HOT],
  ({ type, payload }) => {
    if (type === GUI.MAIN.SET_ACTIVE_WINDOW
      || type === GUI.MAIN.UPDATE_VISIBILITY) {
      return payload
    }
  }
)
.accept(and(defined, unequal))
.val('')


export const zIndex = val(0)
.react(
  [activeWindow.HOT],
  self => self + 1
)


export const controlsPosition = val({
  left: 100,
  top: 0,
  zIndex: 0
})
.react(
  [activeWindow.COLD, mouse.HOT, windowSize.COLD],
  (self, window, mouse: MouseState, size) => {
    const delta = mouse.dragDelta
    const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

    if (
      window === 'controls'
      && target && target.closest('.tvs-flow-controls')
      && (delta.x || delta.y)
    ) {
      self.left -= delta.x
      self.top -= delta.y
      if (self.top < 0) self.top = 0
      if (self.left < 0) self.left = 0
      if (self.top > size.height - 20) self.top = size.height - 20
      if (self.left > size.width - 20) self.left = size.width - 20
      return self
    }
  }
)
.accept(defined)



export const treeWindow = val({
  top: 100,
  left: 0,
  width: 300,
  height: 400,
  zIndex: 0
})
.react(
  [activeWindow.COLD, mouse.HOT, windowSize.COLD],
  (self, window, mouse: MouseState, size) => {
    const delta = mouse.dragDelta
    const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

    if (
      window === 'tree'
      && target && target.closest('.tvs-flow-tree')
      && (delta.x || delta.y)
    ) {
      if (target.className === 'resize') {
        self.width -= delta.x
        self.height -= delta.y
      } else {
        self.left -= delta.x
        self.top -= delta.y
      }
      return setSizeConstrains(self, size)
    }
  }
)
.accept(defined)


export const graphWindow = val({
  top: 200,
  left: 100,
  width: 600,
  height: 600,
  zIndex: 0
})
.react(
  [activeWindow.COLD, mouse.HOT, windowSize.COLD],
  (self, window, mouse: MouseState, size) => {
    const delta = mouse.dragDelta
    const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

    if (
      window === 'graph'
      && target && target.closest('.tvs-flow-graph')
      && (delta.x || delta.y)
    ) {
      if (target.className === 'resize') {
        self.width -= delta.x
        self.height -= delta.y
        return setSizeConstrains(self, size)
      } else if (!target.closest('svg')) {
        self.left -= delta.x
        self.top -= delta.y
        return setSizeConstrains(self, size)
      }
    }
  }
)
.accept(defined)


export const entitiesWindow = val({
  top: 50,
  left: 400,
  width: 400,
  height: 500,
  zIndex: 0
})
.react(
  [activeWindow.COLD, mouse.HOT, windowSize.COLD],
  (self, window, mouse: MouseState, size) => {
    const delta = mouse.dragDelta
    const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

    if (
      window === 'entities'
      && target && target.closest('.tvs-flow-entities')
      && !target.closest('pre')
      && (delta.x || delta.y)
    ) {
      if (target.className === 'resize') {
        self.width -= delta.x
        self.height -= delta.y
      } else {
        self.left -= delta.x
        self.top -= delta.y
      }
      return setSizeConstrains(self, size)
    }
  }
)
.accept(defined)


function updateWindowZIndex (entity, name) {
  entity.react(
    [activeWindow.COLD, zIndex.HOT],
    (self, window, zIndex) => {
      if (window === name) {
        self.zIndex = zIndex
        return self
      }
    }
  )
}

updateWindowZIndex(controlsPosition, 'controls')
updateWindowZIndex(treeWindow, 'tree')
updateWindowZIndex(graphWindow, 'graph')
updateWindowZIndex(entitiesWindow, 'entities')


function setSizeConstrains (dimensions, size) {
  if (dimensions.height > size.height - 20) {
    dimensions.height = size.height - 20
  }
  if (dimensions.width > size.width - 20) {
    dimensions.width = size.width - 20
  }
  if (dimensions.top > size.height - 20) {
    dimensions.top = size.height - 20
  }
  if (dimensions.left > size.width - 20) {
    dimensions.left = size.width - 20
  }
  if (dimensions.top < 0) dimensions.top = 0
  if (dimensions.left < 0) dimensions.left = 0
  return dimensions
}


function updateWindowPosition (entity) {
  entity.react([windowSize.HOT], setSizeConstrains)
}

updateWindowPosition(controlsPosition)
updateWindowPosition(treeWindow)
updateWindowPosition(graphWindow)
updateWindowPosition(entitiesWindow)
