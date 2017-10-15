"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { PORT_TYPES } from 'tvs-flow/dist/lib/runtime-types';
export function createEntityTree(entities, separator) {
    if (separator === void 0) { separator = '.'; }
    var tree = {};
    Object.keys(entities).sort().forEach(function (eid) {
        var entity = entities[eid];
        var parts = entity.id.split(separator);
        var subtree = tree;
        var steps = parts.slice();
        var path = [];
        parts.forEach(function () {
            var p = steps.shift();
            if (!steps.length) {
                subtree[p] = {
                    __entity__: entity
                };
            }
            else {
                path.push(p);
                subtree = subtree[p] = subtree[p] || {
                    __path__: path.join(separator)
                };
            }
        });
    });
    return tree;
}
function getLabelGroup(id) {
    var path = id.split('.');
    var label = path.pop();
    var group = path.join('.');
    return { label: label, group: group };
}
export function processEntities(graph) {
    var entities = {};
    for (var eid in graph.entities) {
        var e = graph.entities[eid];
        var ns = getLabelGroup(eid);
        entities[eid] = __assign({}, e, { name: ns.label, namespace: ns.group, processes: getProcessesOfEntity(e, graph) });
    }
    return entities;
}
export function getProcessesOfEntity(entity, graph) {
    return Object.values(graph.arcs)
        .filter(function (arc) { return arc.entity === entity.id && arc.port == null; })
        .map(function (arc) {
        var p = graph.processes[arc.process];
        var acc = p.ports.indexOf(PORT_TYPES.ACCUMULATOR);
        var startEntities = [];
        if (acc >= 0)
            startEntities[acc] = { eid: entity.id, type: PORT_TYPES.ACCUMULATOR };
        return __assign({}, p, { reaction: acc >= 0, entities: Object.values(graph.arcs)
                .filter(function (a) { return a.process === p.id && a.port != null; })
                .reduce(function (acc, a) {
                acc[a.port] = {
                    eid: a.entity,
                    type: p.ports[a.port]
                };
                return acc;
            }, startEntities)
                .filter(function (e) { return e.eid !== entity.id; }) });
    });
}
//# sourceMappingURL=entity-tree.js.map