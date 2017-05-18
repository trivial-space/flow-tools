var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { style, classes } from "typestyle";
import * as icon from "./icons";
import { highlightColor, mainStyle } from "./styles/main";
import { iconBtn } from "./ui";
import { windowContentStyle, controlsStyle, windowStyle } from "./styles/components";
import { graphView, scaleSlider } from "./graph";
import { processView, entityView } from "./entities";
import { treeView } from "./tree";
import { iconButtonLightStyle } from "./styles/ui";
function title(title) {
    return ['h1', title];
}
var activeButton = style({
    color: highlightColor
});
function setActiveWindow(label, dispatch) {
    return function () { return dispatch('state.gui.setActiveWindow', label); };
}
function controls(_a, dispatch, component) {
    var visibility = _a.visibility, position = _a.position;
    var click = function (label) {
        return function () { return dispatch('state.gui.updateVisibility', label); };
    };
    var el = ['header', {
            class: classes('tvs-flow-controls', controlsStyle),
            onmousedown: setActiveWindow('controls', dispatch),
            style: __assign({}, position)
        },
        component(title, 'state.gui.title'),
        ['nav', { class: 'tvs-controls-btns' },
            ['ul',
                ['li',
                    iconBtn({
                        class: visibility.tree && activeButton,
                        onclick: click('tree'),
                        icon: icon.list(),
                        title: "toggle entity tree"
                    })],
                ['li',
                    iconBtn({
                        class: visibility.graph && activeButton,
                        onclick: click('graph'),
                        icon: icon.graph(),
                        title: "toggle flow graph"
                    })],
                ['li',
                    iconBtn({
                        class: visibility.entities && activeButton,
                        onclick: click('entities'),
                        icon: icon.entities(),
                        title: "toggle entity details"
                    })]]]];
    return el;
}
function treeWindow(_a, dispatch, component) {
    var dimensions = _a.dimensions, window = _a.window;
    var el = ['article', {
            'data-key': 'tree',
            class: classes('tvs-flow-tree', windowStyle),
            style: __assign({}, dimensions),
            onmousedown: setActiveWindow('tree', dispatch)
        },
        ['header',
            icon.list(window === "tree" ? 'selected' : ''),
            ' Tree ',
            ['span', { class: 'gap' }],
            ' ',
            iconBtn({
                icon: icon.close(),
                class: iconButtonLightStyle,
                title: 'close window',
                onclick: function () { return dispatch('closeWindow', 'tree'); }
            })],
        ['section', { class: windowContentStyle }, component(treeView, 'state.gui.treeData')],
        ['footer', {
                class: 'resize',
                'data-key': 'resize'
            }]];
    return el;
}
function graphWindow(_a, dispatch, component) {
    var dimensions = _a.dimensions, window = _a.window;
    var graph = component(graphView, 'state.graph.viewData');
    function updateGraphSize(parent) {
        if (parent && parent.querySelector) {
            var graphNode = parent.querySelector('section');
            dispatch('updateGraphSize', {
                width: graphNode.clientWidth,
                height: graphNode.clientHeight
            });
        }
    }
    var el = ['article', {
            'data-key': 'graph',
            ref: updateGraphSize,
            class: classes('tvs-flow-graph', windowStyle),
            style: __assign({}, dimensions),
            onmousedown: setActiveWindow('graph', dispatch)
        },
        ['header',
            icon.graph(window === "graph" ? 'selected' : ''),
            ' Graph ',
            ['span', { class: 'gap' }],
            component(scaleSlider, 'state.graph.viewBox'),
            ' ',
            iconBtn({
                icon: icon.copy(),
                class: classes(iconButtonLightStyle, 'tvs-save-graph'),
                title: 'copy the current graph state to clipboard'
            }),
            iconBtn({
                icon: icon.close(),
                class: iconButtonLightStyle,
                title: 'close window',
                onclick: function () { return dispatch('closeWindow', 'graph'); }
            })],
        graph,
        ['footer', {
                'data-key': 'resize',
                class: 'resize'
            }]];
    return el;
}
function entitiesWindow(_a, dispatch, component) {
    var dimensions = _a.dimensions, node = _a.node, window = _a.window;
    var view = node && node.procedure
        ? processView(node, dispatch)
        : component(entityView, 'state.gui.entityViewProps');
    var el = ['article', {
            'data-key': 'entities',
            class: classes('tvs-flow-entities', windowStyle),
            style: __assign({}, dimensions),
            onmousedown: setActiveWindow('entities', dispatch)
        },
        ['header',
            icon.entities(window === "entities" ? 'selected' : ''),
            ' ',
            node && node.id,
            ' ',
            ['span', { class: 'gap' }, ' '],
            ' ',
            iconBtn({
                icon: icon.close(),
                class: iconButtonLightStyle,
                title: 'close window',
                onclick: function () { return dispatch('closeWindow', 'entities'); }
            })],
        view,
        ['footer', {
                class: 'resize',
                'data-key': 'resize'
            }]];
    return el;
}
function root(visibility, _, component) {
    var tree = visibility.tree ? component(treeWindow, 'state.gui.treeWindowProps') : '';
    var graph = visibility.graph ? component(graphWindow, 'state.gui.graphWindowProps') : '';
    var entities = visibility.entities ? component(entitiesWindow, 'state.gui.entitiesWindowProps') : '';
    var el = ['article', { class: classes('tvs-flow-tools', mainStyle) },
        component(controls, 'state.gui.controlProps'),
        graph,
        entities,
        tree
    ];
    return el;
}
export function mainView(component) {
    return component(root, 'state.gui.visibility');
}
//# sourceMappingURL=main.js.map