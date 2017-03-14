import * as bel from 'bel'

export function h (elData) {
  const tag = elData.shift(elData)

  let props = elData[0]

  if (typeof props === "object" && !Array.isArray(props)) {
    elData.shift()
  } else {
    props = {}
  }

  return bel.createElement(tag, props, elData.map(el => Array.isArray(el) ? h(el) : el))
}
