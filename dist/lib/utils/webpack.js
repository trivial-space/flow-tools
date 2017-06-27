"use strict";
import { resolveEntityIds, isEntity, getGraphFromAll } from 'tvs-flow/dist/lib/utils/entity-reference';
export function modulePathToNamespace(path, separator) {
    if (separator === void 0) { separator = '.'; }
    return path.split('.')[1].split('/').filter(function (v) { return v; }).join(separator);
}
export function getGraphFromModules(graphModules, nsSeparator) {
    var entities = graphModules.keys()
        .map(function (path) {
        var module = graphModules(path);
        return Object.values(resolveEntityIds(module, modulePathToNamespace(path, nsSeparator)))
            .filter(isEntity);
    })
        .reduce(function (arr, es) { return arr.concat(es); }, []);
    return getGraphFromAll(entities);
}
//# sourceMappingURL=webpack.js.map