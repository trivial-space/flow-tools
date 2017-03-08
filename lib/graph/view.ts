import { stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { viewState } from "./state";
import { unequal } from "../utils/predicates";


export const title = stream(
  [viewState.HOT],
  state => state.title
).accept(unequal)
