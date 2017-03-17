import { val } from "tvs-flow/dist/lib/utils/entity-reference";
import { unequal, defined } from "../../utils/predicates";
import { dispatch } from "../events";


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
  top: 230,
  left: 0,
  width: 300,
  height: 400,
})


export const graphWindow = val<WindowDimension>({
  top: 230,
  left: 100,
  width: 100,
  height: 100,
})


export const entitiesWindow = val<WindowDimension>({
  top: 330,
  left: 0,
  width: 100,
  height: 100,
})


export const visibility = val({
  tree: false,
  graph: false,
  entities: false,
})
.react(
  [dispatch.HOT],
  (self, action) => {
    if (action.type === "update-visibility") {
      return {...self, [action.payload]: !self[action.payload]}
    }
  }
)
.accept(defined)
