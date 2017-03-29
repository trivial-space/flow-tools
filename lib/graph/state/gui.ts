import { val, stream, asyncStream } from "tvs-flow/dist/lib/utils/entity-reference";
import { unequal, defined, and, notEmpty } from "../../utils/predicates";
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


export const title = val('flow inspector')
  .accept(notEmpty)


export const activeWindow = stream(
  [action.HOT],
  ({type, payload}) => {
    if (type === "state.gui.setActiveWindow") {
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


export const visibility = val({
  tree: true,
  graph: true,
  entities: true,
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


export const activeEntity = val('')
.react(
  [action.HOT, graph.COLD],
  (_, {type, payload}, graph) => {
    if (type === 'state.gui.openEntity'
        && graph.entities[payload] != null) {
      return payload
    }
  }
)
.accept(and(defined, unequal))


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
    send(flow.get(entity))
    if (visibility.entities && watching) {
      flow.on(entity, send)
      return () => flow.off(entity, send)
    }
  }
)


export const editedValue = val('')
.react(
  [action.HOT, runtime.COLD],
  (self, {type, payload}, flow) => {
    if (type === 'updateEditedValue') {
      console.log('=========== input!!', payload)
      return payload
    } else if (self && type === 'saveCurrentEntityValue') {
      console.log('=========== saveing!!', self, payload)
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
  [entitiesWindow.HOT, activeEntity.HOT, watchingEntity.HOT],
  (dimensions, entity, watching) => ({dimensions, entity, watching})
)


export const controlProps = stream(
  [visibility.HOT, controlsPosition.HOT],
  (visibility, position) => ({visibility, position})
)

