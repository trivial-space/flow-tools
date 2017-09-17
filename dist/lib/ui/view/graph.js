"use strict";
import { graphViewStyle } from './styles/graph';
import { classes } from 'typestyle/lib';
import { GUI } from '../actions';
export function scaleSlider(_a, dispatch) {
    var scale = _a.scale;
    return ['span',
        ['input', {
                type: 'range',
                value: scale,
                min: 0.5,
                max: 3,
                step: 0.2,
                onchange: function (e) { return dispatch(GUI.GRAPH.UPDATE_SCALE, e.target.value); },
                onmousemove: function (e) { return e.stopPropagation(); }
            }]];
}
export function graphView(data, dispatch) {
    if (!data)
        return ['section', { class: graphViewStyle }];
    var entities = data.entities, processes = data.processes, edges = data.edges, _a = data.viewBox, viewBox = _a === void 0 ? {} : _a;
    return ['section', { class: graphViewStyle }, ['svg', {
                width: '100%',
                height: '100%',
                id: 'graph-ui',
                viewBox: viewBox.x + ", " + viewBox.y + ", " + viewBox.width + ", " + viewBox.height
            }].concat(edges.map(function (e) {
            return ['line', {
                    x1: e.from.x,
                    y1: e.from.y,
                    x2: e.to.x,
                    y2: e.to.y,
                    class: classes(e.class, e.active && 'active')
                }];
        }), processes.map(function (p) {
            return ['circle', {
                    class: classes(p.class, p.active && 'active'),
                    transform: "translate(" + p.x + ", " + p.y + ")",
                    onmousedown: function () { return dispatch(GUI.ENTITY.SET_ACTIVE_PROCESS, p.id); },
                    cx: 0,
                    cy: 0,
                    r: p.autostart ? 13 : 8,
                    title: p.id
                }];
        }), entities.map(function (e) {
            return ['g', {
                    'data-eid': e.id,
                    transform: "translate(" + e.x + ", " + e.y + ")",
                    onmousedown: function () { return dispatch(GUI.ENTITY.SET_ACTIVE_ENTITY, e.id); },
                    title: e.id,
                    class: classes(e.class, e.active && 'active')
                },
                ['rect', {
                        x: -15,
                        y: -15,
                        width: 30,
                        height: 30,
                        class: e.accept ? 'accept' : ''
                    }],
                ['text', {
                        'text-anchor': 'middle',
                        x: 0,
                        y: 30
                    },
                    e.label],
                e.initial && ['circle', {
                        cx: 0,
                        cy: 0,
                        r: 6,
                        class: 'initial'
                    }]];
        }))];
}
//# sourceMappingURL=graph.js.map