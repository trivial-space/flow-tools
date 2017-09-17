"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { mouse, dragDeltas, action } from '../events';
import { defined, unequal } from 'tvs-libs/dist/lib/utils/predicates';
import { graph, metaGraph, metaEntities } from './flow';
import { PORT_TYPES } from 'tvs-flow/dist/lib/runtime-types';
import { graphWindow } from './gui';
import { activeNode, activeEntityId } from './entity';
import { graphDefaultViewBox } from '../../types';
import { newAction, GUI } from '../../actions';
export var viewBox = stream([metaGraph.HOT], function (graph) { return (graph.viewBox || graphDefaultViewBox); })
    .accept(unequal);
export var entityPositions = stream([graph.HOT, metaEntities.HOT, graphWindow.COLD], function (graph, entities, size) {
    var positions = {};
    for (var eid in graph.entities) {
        var e = entities[eid];
        positions[eid] = (e && e.ui && e.ui.graph && e.ui.graph.position) || {
            x: Math.random() * size.width,
            y: Math.random() * size.height
        };
    }
    return positions;
});
action.react([activeEntityId.COLD, entityPositions.COLD, mouse.COLD, dragDeltas.HOT, viewBox.COLD], function (_, id, positions, mouse, delta, viewBox) {
    var t = mouse.pressed[0] && mouse.pressed[0].target;
    var targetId = t && (t.dataset.eid || (t.parentElement && t.parentElement.dataset.eid));
    if (targetId
        && id === targetId
        && self[id]
        && (delta.x || delta.y)) {
        return newAction(GUI.GRAPH.SET_ENTITY_POSITION, {
            eid: id,
            pos: {
                x: positions[id].x - delta.x * viewBox.scale,
                y: positions[id].y - delta.y * viewBox.scale
            }
        });
    }
})
    .accept(defined);
function getLabelGroup(id) {
    var path = id.split('.');
    var label = path.pop();
    var group = path.join('.');
    return { label: label, group: group };
}
export var graphEntities = stream([graph.HOT, activeNode.HOT], function (graph, active) {
    var entities = {};
    var groups = {};
    var groupNr = 0;
    for (var key in graph.entities) {
        var e = graph.entities[key];
        var _a = getLabelGroup(key), label = _a.label, group = _a.group;
        groups[group] = groups[group] || (groupNr++ % 7) + 1;
        var node = {
            id: e.id,
            class: 'group-' + groups[group],
            label: label,
            active: e.id === active.id
        };
        if (e.accept != null) {
            node.accept = true;
        }
        if (e.value != null) {
            node.initial = true;
        }
        entities[key] = node;
    }
    return entities;
})
    .react([entityPositions.HOT], function (self, positions) {
    for (var eid in self) {
        self[eid].x = positions[eid].x;
        self[eid].y = positions[eid].y;
    }
    return self;
});
export var graphProcesses = stream([graph.HOT, activeNode.HOT], function (graph, active) {
    var processes = {};
    for (var key in graph.processes) {
        var p = graph.processes[key];
        var node = __assign({ id: key }, getLabelGroup(key), { from: [], async: p.async, autostart: p.autostart, active: p.id === active.id, acc: p.ports && p.ports.includes(PORT_TYPES.ACCUMULATOR) });
        for (var akey in graph.arcs) {
            var a = graph.arcs[akey];
            if (a.process === key) {
                if (a.port != null) {
                    node.from.push([a.entity, p.ports && p.ports[a.port]]);
                }
                else {
                    node.to = a.entity;
                }
            }
        }
        processes[key] = node;
    }
    return processes;
});
var pDistance = 50;
export var viewData = stream([graphEntities.HOT, graphProcesses.HOT], function (entities, processes) {
    var ps = [];
    var edges = [];
    for (var pid in processes) {
        var p = processes[pid];
        var to = entities[p.to];
        p.class = to.class;
        if (p.from.length) {
            p.x = 0;
            p.y = 0;
            for (var _i = 0, _a = p.from; _i < _a.length; _i++) {
                var _b = _a[_i], eid = _b[0], type = _b[1];
                var from = entities[eid];
                var x = from.x - to.x;
                var y = from.y - to.y;
                if (type === PORT_TYPES.COLD) {
                    x /= 2;
                    y /= 2;
                }
                p.x += x;
                p.y += y;
            }
            var l = Math.sqrt(p.x * p.x + p.y * p.y);
            p.x = pDistance * p.x / l + to.x;
            p.y = pDistance * p.y / l + to.y;
            for (var _c = 0, _d = p.from; _c < _d.length; _c++) {
                var _e = _d[_c], eid = _e[0], type = _e[1];
                var from = entities[eid];
                p.fromIsActive = p.fromIsActive || from.active;
                edges.push({
                    from: from,
                    to: p,
                    class: 'from' + (type === PORT_TYPES.COLD ? ' cold' : ''),
                    title: type,
                    active: to.active || p.active || from.active
                });
            }
        }
        else {
            p.x = to.x;
            p.y = to.y - pDistance;
        }
        ps.push(p);
        edges.push({
            from: p,
            to: to,
            class: 'to' + (p.async ? ' async' : ''),
            active: to.active || p.active || p.fromIsActive
        });
        if (p.acc) {
            edges.push({
                from: p,
                to: to,
                class: 'to acc'
            });
        }
    }
    return {
        entities: Object.values(entities),
        processes: ps,
        edges: edges
    };
})
    .react([viewBox.HOT], function (self, viewBox) {
    self.viewBox = {
        x: viewBox.offsetX * viewBox.scale,
        y: viewBox.offsetY * viewBox.scale,
        width: viewBox.width * viewBox.scale,
        height: viewBox.height * viewBox.scale
    };
    return self;
});
//# sourceMappingURL=graph.js.map