import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { Runtime } from "tvs-flow/dist/lib/runtime-types";


export interface ViewState {
  title: string
}


export const viewState = val<ViewState>({
  title: 'hello'
})


export const flow = val<Runtime>()


export const flowGraph = stream(
  [flow.HOT],
  (flow: Runtime) => flow.getGraph()
)
