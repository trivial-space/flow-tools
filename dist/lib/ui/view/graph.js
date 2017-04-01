import { graphViewStyle } from "./styles/graph";
import { h } from "../../utils/yoyo";
export function scaleSlider(_a, dispatch) {
    var scale = _a.scale;
    return h(['span',
        ['input', {
                type: 'range',
                value: scale,
                min: 0.5,
                max: 3,
                step: 0.2,
                onchange: function (e) { return dispatch('updateGraphScale', e.target.value); },
                onmousemove: function (e) { return e.stopPropagation(); }
            }]]);
}
export function graphView(data, dispatch) {
    if (!data)
        return h(['section', { class: graphViewStyle }]);
    var entities = data.entities, processes = data.processes, edges = data.edges, _a = data.viewBox, viewBox = _a === void 0 ? {} : _a;
    var el = h(['section', { class: graphViewStyle }, ['svg', {
                width: '100%',
                height: '100%',
                viewBox: viewBox.x + ", " + viewBox.y + ", " + viewBox.width + ", " + viewBox.height
            }].concat(edges.map(function (e) {
            return ['line', {
                    x1: e.from.x,
                    y1: e.from.y,
                    x2: e.to.x,
                    y2: e.to.y,
                    class: e.class
                }];
        }), processes.map(function (p) {
            return ['circle', {
                    'data-key': p.id,
                    class: p.class,
                    transform: "translate(" + p.x + ", " + p.y + ")",
                    cx: 0,
                    cy: 0,
                    r: p.autostart ? 13 : 8,
                    title: p.id
                }];
        }), entities.map(function (e) {
            return ['g', {
                    'data-key': e.id,
                    transform: "translate(" + e.x + ", " + e.y + ")",
                    onmousedown: function () { return dispatch('state.gui.openEntity', e.id); },
                    title: e.id,
                    class: e.class
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
        }))]);
    return el;
}
//# sourceMappingURL=graph.js.map