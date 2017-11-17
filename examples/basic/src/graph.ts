import { val, stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'


export const first: EntityRef<number> = val(10)

export const third: EntityRef<number> = val(110)

export const second = stream(
	[first.HOT, third.COLD],
	(first, third) => first + third + 100
)
