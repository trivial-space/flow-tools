import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { unequal, defined } from "../../utils/predicates";
import { dispatch } from "../events";
import { entityTree } from "./flow";


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
  .accept(unequal)


export const controlsPosition = val<Position>({
  left: 0,
  top: 0
})


export const treeWindow = val<WindowDimension>({
  top: 100,
  left: 0,
  width: 300,
  height: 400,
})


export const treeViewProps = val({
  treeViewComponent: 'tree'
})
.react(
  [dispatch.HOT],
  (self, action) => {
    if (action.type === "state.gui.setTreeView") {
      return {...self, treeViewComponent: action.payload}
    }
  }
)
.accept(defined)


export const treeFold = val({})
.react(
  [dispatch.HOT],
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
  (dim, props) => ({dimensions: dim, props})
)


export const graphWindow = val<WindowDimension>({
  top: 100,
  left: 100,
  width: 100,
  height: 100,
})


export const entitiesWindow = val<WindowDimension>({
  top: 100,
  left: 400,
  width: 400,
  height: 500,
})


export const visibility = val({
  tree: true,
  graph: true,
  entities: true,
})
.react(
  [dispatch.HOT],
  (self, {type, payload}) => {
    if (type === "state.gui.updateVisibility") {
      return {...self, [payload]: !self[payload]}
    }
  }
)
.accept(defined)
