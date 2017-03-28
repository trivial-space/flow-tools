import { Entity } from "tvs-flow/dist/lib/runtime-types";


export function createEntityTree(entities: { [id: string]: Entity }, separator = '.') {

  const tree = {}

  Object.keys(entities).sort().forEach(entityKey => {

    const entity = entities[entityKey]
    const id = entity.id
    const parts = id.split(separator)

    let subtree = tree
    const steps = [...parts]
    const path: string[] = []

    for(let i = 0; i < parts.length; i++) {
      let p = steps.shift() as string
      if (!steps.length) {
        subtree[p] = {__id__: id}
      } else {
        path.push(p)
        subtree = subtree[p] = subtree[p] || {
          __path__: path.join(separator),
        }
      }
    }
  })

  return tree
}
