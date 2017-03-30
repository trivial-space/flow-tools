import { val, stream, EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
import { Runtime, Graph } from "tvs-flow/dist/lib/runtime-types";
import { createEntityTree } from "utils/entity-tree";


export const runtime: EntityRef<Runtime> = val()


export const graph: EntityRef<Graph> = stream(
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
