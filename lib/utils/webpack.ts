import { resolveEntityIds, isEntity, getGraphFromAll } from "tvs-flow/dist/lib/utils/entity-reference";


export function modulePathToNamespace(path, separator = '.') {
  return path.split('.')[1].split('/').filter(v => v).join(separator)
}


export function getGraphFromModules(graphModules, nsSeparator?) {
  const entities = graphModules.keys()
    .map(path => {
      const module = graphModules(path)
      return Object.values(resolveEntityIds(module, modulePathToNamespace(path, nsSeparator)))
        .filter(isEntity)
    })
    .reduce((arr, es) => arr.concat(es), [])

  return getGraphFromAll(entities)
}
