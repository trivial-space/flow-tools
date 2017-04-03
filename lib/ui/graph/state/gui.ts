import { val, stream, asyncStream, EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
import { unequal, defined, and, notEmpty } from "tvs-libs/dist/lib/utils/predicates";
import { action, mouse } from "../events";
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
  (self, {type, payload}) => {
    if (type === "state.gui.updateVisibility") {
      return {...self, [payload]: !self[payload]}
    }
  }
)
.accept(defined)


export const activeWindow = stream(
  [action.HOT],
  ({type, payload}) => {
    if (type === "state.gui.setActiveWindow"
        || type === "state.gui.updateVisibility") {
      return payload
    }
  }
)
.accept(and(defined, unequal))


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
  [activeWindow.COLD, mouse.HOT],
  (self, window, mouse: MouseState) => {
    const delta = mouse.dragDelta

    if (window === 'controls' && (delta.x || delta.y)) {
      self.left -= delta.x
      self.top -= delta.y
      return self
    }
  }
)
.react(
  [activeWindow.COLD, zIndex.HOT],
  (self, window, zIndex) => {
    if (window === 'controls') {
      self.zIndex = zIndex
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
  [activeWindow.COLD, mouse.HOT],
  (self, window, mouse: MouseState) => {
    const delta = mouse.dragDelta

    if (window === 'tree' && mouse.pressed[0] && (delta.x || delta.y)) {
      if ((mouse.pressed[0].target as HTMLElement).className === 'resize') {
        self.width -= delta.x
        self.height -= delta.y
      } else {
        self.left -= delta.x
        self.top -= delta.y
      }
      return self
    }
  }
)
.react(
  [activeWindow.COLD, zIndex.HOT],
  (self, window, zIndex) => {
    if (window === 'tree') {
      self.zIndex = zIndex
      return self
    }
  }
)
.accept(defined)


export const treeViewProps = val({
  treeViewComponent: 'tree'
})
.react(
  [action.HOT],
  (self, action) => {
    if (action.type === "state.gui.setTreeView") {
      return {...self, treeViewComponent: action.payload}
    }
  }
)
.accept(defined)


export const treeFold = val({})
.react(
  [action.HOT],
  (self, {type, payload}) => {
    if (type === 'state.gui.toggleTreeLevel') {
      return { ...self, [payload]: !self[payload] }
    }
  }
)
.accept(defined)


export const treeData = stream(
  [treeFold.HOT, entityTree.HOT],
  (fold, tree) => ({fold, tree})
).val({fold: null, tree: null})


export const treeWindowProps = stream(
  [treeWindow.HOT, treeViewProps.HOT],
  (dimensions, props) => ({dimensions, props})
)


export const graphWindow = val({
  top: 200,
  left: 100,
  width: 600,
  height: 600,
  zIndex: 0
})
.react(
  [activeWindow.COLD, mouse.HOT],
  (self, window, mouse: MouseState) => {
    const delta = mouse.dragDelta
    if (window === 'graph' && mouse.pressed[0] && (delta.x || delta.y)) {
      if ((mouse.pressed[0].target as HTMLElement).className === 'resize') {
        self.width -= delta.x
        self.height -= delta.y
        return self
      } else if (!(mouse.pressed[0].target as HTMLElement).closest('svg')) {
        self.left -= delta.x
        self.top -= delta.y
        return self
      }
    }
  }
)
.react(
  [activeWindow.COLD, zIndex.HOT],
  (self, window, zIndex) => {
    if (window === 'graph') {
      self.zIndex = zIndex
      return self
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
  [activeWindow.COLD, mouse.HOT],
  (self, window, mouse: MouseState) => {
    const delta = mouse.dragDelta

    if (window === 'entities' && mouse.pressed[0] && (delta.x || delta.y)) {
      if ((mouse.pressed[0].target as HTMLElement).className === 'resize') {
        self.width -= delta.x
        self.height -= delta.y
      } else {
        self.left -= delta.x
        self.top -= delta.y
      }
      return self
    }
  }
)
.react(
  [activeWindow.COLD, zIndex.HOT],
  (self, window, zIndex) => {
    if (window === 'entities') {
      self.zIndex = zIndex
      return self
    }
  }
)
.accept(defined)


export const activeEntity = val({})
.react(
  [action.HOT, graph.COLD],
  (_, {type, payload}, graph) => {
    if (type === 'state.gui.openEntity') {
      return graph.entities[payload]
    }
  }
)
.accept(defined)


export const activeProcess = val({})
.react(
  [action.HOT, graph.COLD],
  (_, {type, payload}, graph) => {
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
  (_, {type, payload}) => {
    if (type === 'setEntityEditMode') {
      return !payload
    } else if (type === 'saveCurrentEntityValue') {
      return true
    }
  }
)
.react(
  [activeEntity.HOT], () => true
)
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
  (self, {type, payload}, flow) => {
    if (type === 'updateEditedValue') {
      return payload
    } else if (self && type === 'saveCurrentEntityValue') {
      requestAnimationFrame(function() {
        flow.set(payload, JSON.parse(self))
      })
    }
  }
)
.react(
  [activeValue.HOT], () => ''
)
.accept(and(defined, unequal))


export const entityView = stream(
  [activeValue.HOT, watchingEntity.HOT],
  (value, watching) => ({value, watching})
).val({value: null, watching: true})


export const entitiesWindowProps = stream(
  [entitiesWindow.HOT, activeNode.HOT],
  (dimensions, node) => ({dimensions, node})
)


export const entityViewProps = stream(
  [activeEntity.HOT, watchingEntity.HOT],
  (entity, watching) => ({entity, watching})
)


export const controlProps = stream(
  [visibility.HOT, controlsPosition.HOT],
  (visibility, position) => ({visibility, position})
)

