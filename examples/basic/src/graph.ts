import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";


export const first = val(10)

export const second = stream([first.HOT], first => first + 100)
