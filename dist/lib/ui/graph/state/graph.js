var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { mouse, action } from "../events";
import { defined } from "tvs-libs/dist/lib/utils/predicates";
import { graph } from "./flow";
import { PORT_TYPES } from "tvs-flow/dist/lib/runtime-types";
import { graphWindow, activeEntity } from "./gui";
export var viewBox = val({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    scale: 1
})
    .react([action.HOT], function (self, _a) {
    var type = _a.type, payload = _a.payload;
    if (type === 'updateGraphScale'
        && (payload !== self.scale)) {
        self.scale = payload;
        return self;
    }
})
    .react([action.HOT], function (self, _a) {
    var type = _a.type, payload = _a.payload;
    if (type === 'updateGraphSize'
        && (payload.width !== self.width || payload.height !== self.height)) {
        self.width = payload.width;
        self.height = payload.height;
        return self;
    }
})
    .react([mouse.HOT], function (self, mouse) {
    var delta = mouse.dragDelta;
    if (mouse.pressed[0] && mouse.pressed[0].target.tagName.toLowerCase() === 'svg'
        && (delta.x || delta.y)) {
        self.offsetX += delta.x;
        self.offsetY += delta.y;
        return self;
    }
})
    .accept(defined);
export var nodeState = val({})
    .react([graph.HOT, graphWindow.COLD], function (self, graph, size) {
    for (var eid in graph.entities) {
        if (!self[eid]) {
            self[eid] = {
                x: Math.random() * size.width,
                y: Math.random() * size.height
            };
        }
    }
})
    .react([activeEntity.COLD, mouse.HOT, viewBox.COLD], function (self, _a, mouse, viewBox) {
    var id = _a.id;
    var delta = mouse.dragDelta;
    var t = mouse.pressed[0] && mouse.pressed[0].target;
    var targetId = t && (t.dataset.key || (t.parentElement && t.parentElement.dataset.key));
    if (targetId
        && id === targetId
        && self[id]
        && (delta.x || delta.y)) {
        self[id].x -= delta.x * viewBox.scale;
        self[id].y -= delta.y * viewBox.scale;
        return self;
    }
})
    .accept(defined);
function getLabelGroup(id) {
    var path = id.split('.');
    var label = path.pop();
    var group = path.join('.');
    return { label: label, group: group };
}
export var graphEntities = stream([graph.HOT], function (graph) {
    var entities = {};
    var groups = {};
    var groupNr = 0;
    for (var key in graph.entities) {
        var e = graph.entities[key];
        var _a = getLabelGroup(key), label = _a.label, group = _a.group;
        groups[group] = groups[group] || (groupNr++ % 7) + 1;
        var node = __assign({ id: e.id, class: 'group-' + groups[group], label: label }, nodeState[key]);
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
    .react([nodeState.HOT], function (self, state) {
    for (var eid in self) {
        self[eid].x = state[eid].x;
        self[eid].y = state[eid].y;
    }
    return self;
});
export var graphProcesses = stream([graph.HOT], function (graph) {
    var processes = {};
    for (var key in graph.processes) {
        var p = graph.processes[key];
        var node = __assign({ id: key }, getLabelGroup(key), { from: [], async: p.async, autostart: p.autostart, acc: p.ports && p.ports.includes(PORT_TYPES.ACCUMULATOR) });
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
            for (var i = 0; i < p.from.length; i++) {
                var from = entities[p.from[i][0]];
                var type = p.from[i][1];
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
            for (var i = 0; i < p.from.length; i++) {
                var _a = p.from[i], eid = _a[0], type = _a[1];
                edges.push({
                    from: entities[eid],
                    to: p,
                    class: 'from' + (type === PORT_TYPES.COLD ? ' cold' : ''),
                    title: type
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
            class: 'to' + (p.async ? ' async' : '')
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