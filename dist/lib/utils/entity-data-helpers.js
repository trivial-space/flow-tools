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
export function processGraph(graph) {
    var entities = {};
    var processes = {};
    var _loop_1 = function (eid) {
        var e = graph.entities[eid];
        var ns = getLabelGroup(eid);
        entities[eid] = __assign({}, e, { name: ns.label, namespace: ns.group, processes: Object.values(graph.arcs)
                .filter(function (arc) { return arc.entity === e.id && arc.port == null; })
                .map(function (arc) { return arc.process; }) });
    };
    for (var eid in graph.entities) {
        _loop_1(eid);
    }
    var _loop_2 = function (pid) {
        var p = graph.processes[pid];
        var ns = getLabelGroup(pid.split('::').shift());
        var acc = p.ports.indexOf(PORT_TYPES.ACCUMULATOR);
        var startEntities = [];
        var outArc = Object.values(graph.arcs).find(function (a) { return a.process === pid && a.port == null; });
        var outEntity = outArc && outArc.entity;
        if (acc >= 0 && outEntity) {
            startEntities[acc] = { eid: outEntity, type: PORT_TYPES.ACCUMULATOR };
        }
        processes[pid] = __assign({}, p, { name: ns.label, namespace: ns.group, reaction: acc >= 0, output: outEntity, inputs: Object.values(graph.arcs)
                .filter(function (a) { return a.process === pid && a.port != null; })
                .reduce(function (acc, a) {
                acc[a.port] = {
                    eid: a.entity,
                    type: p.ports[a.port]
                };
                return acc;
            }, startEntities) });
    };
    for (var pid in graph.processes) {
        _loop_2(pid);
    }
    return { entities: entities, processes: processes };
}
export function printEntityName(e) {
    return e.name
        ? e.namespace + ' / ' + e.name
        : e.id || 'No entity selected';
}
//# sourceMappingURL=entity-data-helpers.js.map