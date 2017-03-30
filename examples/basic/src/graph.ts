import { val, stream, EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";


export const first: EntityRef<number> = val(10)

export const second = stream([first.HOT], first => first + 100)
