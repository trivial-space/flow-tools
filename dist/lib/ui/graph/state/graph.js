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
import { equalObject } from 'tvs-libs/dist/lib/utils/predicates';
import { graph, metaGraph, metaEntities, enhancedEntityData } from './flow';
import { PORT_TYPES } from 'tvs-flow/dist/lib/runtime-types';
import { activeNode } from './entity';
import { graphDefaultViewBox } from '../../types';
export var viewBox = stream([metaGraph.HOT], function (graph) { return (graph.viewBox || graphDefaultViewBox); })
    .accept(function (v1, v2) { return !v2 || !equalObject(v1, v2); });
export var entityPositions = stream([graph.HOT], function (_) { return ({}); })
    .react([metaEntities.HOT, graph.COLD], function (self, entities, graph) {
    for (var eid in graph.entities) {
        var e = entities[eid];
        var pos = e && e.ui && e.ui.graph && e.ui.graph.position;
        if (pos) {
            self[eid] = pos;
        }
        else if (!self[eid]) {
            self[eid] = {
                x: Math.random() * 800,
                y: Math.random() * 800
            };
        }
    }
    return self;
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