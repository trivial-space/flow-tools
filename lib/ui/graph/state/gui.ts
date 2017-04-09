import { val, stream, asyncStream, EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
import { unequal, defined, and, notEmpty } from "tvs-libs/dist/lib/utils/predicates";
import { action, mouse, windowSize } from "../events";
import { entityTree, runtime, graph } from "./flow";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";
import { MouseState } from "tvs-libs/dist/lib/events/mouse";


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
    if (type === "state.gui.updateVisibility") {
      return { ...self, [payload]: !self[payload] }
    }
  }
)
.accept(defined)


export const activeWindow = stream(
  [action.HOT],
  ({ type, payload }) => {
    if (type === "state.gui.setActiveWindow"
      || type === "state.gui.updateVisibility") {
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
  left: 0,
  top: 0,
  zIndex: 0
})
.react(
  [activeWindow.COLD, mouse.HOT, windowSize.COLD],
  (self, window, mouse: MouseState, size) => {
    const delta = mouse.dragDelta
    const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

    if (window === 'controls'
      && target && target.closest('.tvs-flow-controls')
      && (delta.x || delta.y)) {
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

    if (window === 'tree'
      && target && target.closest('.tvs-flow-tree')
      && (delta.x || delta.y)) {
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


export const treeFold = val({})
.react(
  [action.HOT],
  (self, { type, payload }) => {
    if (type === 'state.gui.toggleTreeLevel') {
      return { ...self, [payload]: !self[payload] }
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

    if (window === 'graph'
      && target && target.closest('.tvs-flow-graph')
      && (delta.x || delta.y)) {
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

    if (window === 'entities'
      && target && target.closest('.tvs-flow-entities')
      && !target.closest('pre')
      && (delta.x || delta.y)) {
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


export const activeEntity = val({})
.react(
  [action.HOT, graph.COLD],
  (_, { type, payload }, graph) => {
    if (type === 'state.gui.openEntity') {
      return graph.entities[payload]
    }
  }
)
.accept(defined)


export const activeProcess = val({})
.react(
  [action.HOT, graph.COLD],
  (_, { type, payload }, graph) => {
    if (type === 'state.gui.openProcess') {
      return graph.processes[payload]
    }
  }
)
.accept(defined)


export const activeNode = val({})
.react([activeEntity.HOT], (_, e) => e)
.react([activeProcess.HOT], (_, p) => p)


export const watchingEntity = val(true)
.react(
  [action.HOT],
  (_, { type, payload }) => {
    if (type === 'setEntityEditMode') {
      return !payload
    } else if (type === 'saveCurrentEntityValue') {
      return true
    }
  }
)
.react([activeEntity.HOT], () => true)
.accept(defined)


export const activeValue = asyncStream(
  [runtime.COLD, activeEntity.HOT, visibility.HOT, watchingEntity.HOT],
  (send, flow: Runtime, entity, visibility, watching) => {
    send(flow.get(entity.id))
    if (visibility.entities && watching) {
      flow.on(entity.id, send)
      return () => flow.off(entity.id, send)
    }
  }
)


export const editedValue = val('')
.react(
  [action.HOT, runtime.COLD],
  (self, { type, payload }, flow) => {
    if (type === 'updateEditedValue') {
      return payload
    } else if (self && type === 'saveCurrentEntityValue') {
      requestAnimationFrame(function() {
        flow.set(payload, JSON.parse(self))
      })
    }
  }
)
.react([activeValue.HOT], () => '')
.accept(and(defined, unequal))


export const entityValueView = stream(
  [activeValue.HOT, watchingEntity.HOT],
  (value, watching) => ({ value, watching })
).val({ value: null, watching: true })


export const entitiesWindowProps = stream(
  [entitiesWindow.HOT, activeNode.HOT, activeWindow.HOT],
  (dimensions, node, window) => ({ dimensions, node, window })
).val({} as any)


export const entityViewProps = stream(
  [activeEntity.HOT, watchingEntity.HOT],
  (entity, watching) => ({ entity, watching })
)


export const controlProps = stream(
  [visibility.HOT, controlsPosition.HOT],
  (visibility, position) => ({ visibility, position })
)


export const treeWindowProps = stream(
  [treeWindow.HOT, activeWindow.HOT],
  (dimensions, window) => ({ dimensions, window })
).val({} as any)


export const graphWindowProps = stream(
  [graphWindow.HOT, activeWindow.HOT],
  (dimensions, window) => ({ dimensions, window })
).val({} as any)


export const treeData = stream(
  [treeFold.HOT, entityTree.HOT, activeEntity.HOT],
  (fold, tree, selected) => ({ fold, tree, selected })
).val({ fold: null, tree: null, selected: {} })


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
  if (dimensions.height > size.height - 40) {
    dimensions.height = size.height - 40
  }
  if (dimensions.width > size.width - 40) {
    dimensions.width = size.width - 40
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
