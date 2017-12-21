var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { stream, asyncStream, val } from 'tvs-flow/dist/lib/utils/entity-reference';
import { equalObject } from 'tvs-libs/dist/lib/utils/predicates';
import { metaGraph, metaEntities, enhancedEntityData, graph, runtime } from './flow';
import { PORT_TYPES } from 'tvs-flow/dist/lib/runtime-types';
import { activeNode } from './entity';
import { graphDefaultViewBox } from '../../types';
import { sub, normalize, length, mul, add } from 'tvs-libs/dist/lib/math/vectors';
export var viewBox = stream([metaGraph.HOT], function (graph) { return (graph.viewBox || graphDefaultViewBox); })
    .accept(function (v1, v2) { return !v2 || !equalObject(v1, v2); });
export var simulationSteps = val(500);
export var initialPosition = stream([graph.HOT], function (graph) {
    var positions = {};
    for (var eid in graph.entities) {
        positions[eid] = {
            x: Math.random() * 800,
            y: Math.random() * 800
        };
    }
    return positions;
});
export var entityPositions = asyncStream([metaEntities.HOT, simulationSteps.HOT, enhancedEntityData.COLD, initialPosition.HOT], function (send, esMeta, steps, esData, positions) {
    for (var eid in esMeta) {
        var e = esMeta[eid];
        var pos = e && e.ui && e.ui.graph && e.ui.graph.position;
        if (pos) {
            positions[eid] = pos;
        }
    }
    send(positions);
    var ids = Object.keys(esData);
    function simulateForces() {
        var forces = {};
        for (var i_1 = 0; i_1 < ids.length; i_1++) {
            var eid = ids[i_1];
            var e = esData[eid];
            var e1Pos = positions[eid];
            for (var _i = 0, _a = e.processes; _i < _a.length; _i++) {
                var p = _a[_i];
                for (var _b = 0, _c = p.entities; _b < _c.length; _b++) {
                    var eP = _c[_b];
                    var springLength = esData[eP.eid].namespace === e.namespace ? 200 : 300;
                    var e2Pos = positions[eP.eid];
                    var vec = sub([e2Pos.x, e2Pos.y], [e1Pos.x, e1Pos.y]);
                    var dist = length(vec);
                    var dir = normalize(vec);
                    var diff = dist - springLength;
                    var force = eP.type === PORT_TYPES.COLD ? diff * 0.5 : diff * 2;
                    forces[eid] = add(forces[eid] || [0, 0], mul(force, dir));
                    forces[eP.eid] = add(forces[eP.eid] || [0, 0], mul(force * -1, dir));
                }
            }
            for (var j = i_1 + 1; j < ids.length; j++) {
                var eid2 = ids[j];
                var e2 = esData[eid2];
                var e2Pos = positions[eid2];
                var vec = sub([e2Pos.x, e2Pos.y], [e1Pos.x, e1Pos.y]);
                var dist = length(vec);
                var dir = normalize(vec);
                var force = Math.max(100 - dist, 0);
                forces[eid] = add(forces[eid] || [0, 0], mul(force * -1, dir));
                forces[eid2] = add(forces[eid2] || [0, 0], mul(force, dir));
                if (e.namespace === e2.namespace) {
                    var force_1 = dist - 300;
                    forces[eid] = add(forces[eid] || [0, 0], mul(force_1, dir));
                    forces[eid2] = add(forces[eid2] || [0, 0], mul(force_1 * -1, dir));
                }
                else {
                    var force_2 = Math.max(300 - dist, 0);
                    forces[eid] = add(forces[eid] || [0, 0], mul(force_2 * -1, dir));
                    forces[eid2] = add(forces[eid2] || [0, 0], mul(force_2, dir));
                }
            }
        }
        for (var eid in forces) {
            var force = forces[eid];
            var l = length(force);
            if (l > steps / 2) {
                var n = normalize(force);
                var pos = positions[eid];
                var _d = add([pos.x, pos.y], mul(l / steps, n)), x = _d[0], y = _d[1];
                positions[eid] = { x: Math.floor(x), y: Math.floor(y) };
            }
        }
    }
    var i = steps;
    function animate() {
        if (i > 10) {
            var oldPositions = {};
            for (var eid in positions) {
                oldPositions[eid] = positions[eid];
            }
            for (var j = 10; j > 0; j--) {
                simulateForces();
                i--;
            }
            var equals = true;
            for (var eid in positions) {
                var o = oldPositions[eid];
                var n = positions[eid];
                if (o !== n && (o.x !== n.x || o.y !== n.y)) {
                    equals = false;
                }
            }
            if (!equals) {
                send(positions);
                if (i > 10) {
                    setTimeout(animate, 60);
                }
            }
        }
    }
    requestAnimationFrame(animate);
    return function () { i = 0; };
});
runtime.react([entityPositions.HOT], function (self, pos) {
    var meta = {};
    for (var eid in pos) {
        meta[eid] = { ui: { graph: { position: pos[eid] } } };
    }
    self.setMeta({ entities: meta });
});
var pDistance = 50;
export var graphData = stream([enhancedEntityData.HOT, activeNode.HOT, entityPositions.HOT], function (entityData, active, positions) {
    var groups = {};
    var groupNr = 0;
    var processes = [];
    var entities = [];
    var edges = [];
    for (var eid in entityData) {
        var e = entityData[eid];
        groups[e.namespace] = groups[e.namespace] || (groupNr++ % 7) + 1;
        var eNode = __assign({}, positions[eid], { id: e.id, class: 'group-' + groups[e.namespace], label: e.name, active: e.id === active.id });
        if (e.accept != null) {
            eNode.accept = true;
        }
        if (e.value != null) {
            eNode.initial = true;
        }
        entities.push(eNode);
        for (var _i = 0, _a = e.processes; _i < _a.length; _i++) {
            var p = _a[_i];
            var pNode = {
                id: p.id,
                async: p.async,
                autostart: p.autostart,
                active: p.id === active.id,
                acc: p.reaction,
                from: p.entities,
                to: eid,
                class: eNode.class
            };
            if (p.entities.length) {
                pNode.x = 0;
                pNode.y = 0;
                for (var _b = 0, _c = p.entities; _b < _c.length; _b++) {
                    var _d = _c[_b], eid_1 = _d.eid, type = _d.type;
                    var fromPos = positions[eid_1];
                    if (fromPos) {
                        var x = fromPos.x - eNode.x;
                        var y = fromPos.y - eNode.y;
                        if (type === PORT_TYPES.COLD) {
                            x /= 2;
                            y /= 2;
                        }
                        pNode.x += x;
                        pNode.y += y;
                    }
                    pNode.fromIsActive = pNode.fromIsActive || eid_1 === active.id;
                    edges.push({
                        from: fromPos,
                        to: pNode,
                        class: 'from' + (type === PORT_TYPES.COLD ? ' cold' : ''),
                        title: type,
                        active: eNode.active || pNode.active || eid_1 === active.id
                    });
                }
                var l = Math.sqrt(pNode.x * pNode.x + pNode.y * pNode.y);
                pNode.x = pDistance * pNode.x / l + eNode.x;
                pNode.y = pDistance * pNode.y / l + eNode.y;
            }
            else {
                pNode.x = eNode.x;
                pNode.y = eNode.y - pDistance;
            }
            processes.push(pNode);
            edges.push({
                from: pNode,
                to: eNode,
                class: 'to' + (p.async ? ' async' : ''),
                active: eNode.active || pNode.active || pNode.fromIsActive
            });
            if (p.reaction) {
                edges.push({
                    from: pNode,
                    to: eNode,
                    class: 'to acc'
                });
            }
        }
    }
    return {
        entities: entities,
        processes: processes,
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