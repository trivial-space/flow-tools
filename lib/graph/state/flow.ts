import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";
import { createEntityTree } from "../../utils/entity-tree";


export const runtime = val<Runtime>()


export const graph = stream(
  [runtime.HOT],
  (flow: Runtime) => flow.getGraph()
)


export const state = stream(
  [runtime.HOT],
  (flow: Runtime) => flow.getState()
)


export const entityTree = stream(
  [graph.HOT],
  graph => createEntityTree(graph.entities)
)
