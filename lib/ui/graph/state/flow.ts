import { val, stream, EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
import { Runtime, Graph } from "tvs-flow/dist/lib/runtime-types";
import { createEntityTree } from "../../../utils/entity-tree";
import { action } from "../events";
import { defined } from "tvs-libs/dist/lib/utils/predicates";


export const runtime: EntityRef<Runtime> = val()
.react(
  [action.HOT],
  (self: Runtime, {type, payload}) => {
    switch (type) {
      case 'flowProcessRun':
        self.start(payload)
        return
      case 'flowProcessStop':
        self.stop(payload)
        return
      case 'flowEntityReset':
        self.set(payload, self.getGraph().entities[payload].value)
        return
      case 'flowEntityInspect':
        console.log(payload, self.get(payload))
        return
    }
  }
)
.accept(defined)


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
