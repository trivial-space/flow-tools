import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";


export const runtime = val<Runtime>()


export const graph = stream(
  [runtime.HOT],
  (flow: Runtime) => flow.getGraph()
)


export const state = stream(
  [runtime.HOT],
  (flow: Runtime) => flow.getState()
)
