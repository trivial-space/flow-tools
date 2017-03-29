export const unequal = (a, b) => a !== b

export const defined = a => a != null

export const notEmpty = a => a && a.length

export const and = (p1, p2) => (a, b) => p1(a, b) && p2(a, b)
