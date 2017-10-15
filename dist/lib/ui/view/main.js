"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { style, classes } from 'typestyle';
import * as icon from './icons';
import { highlightColor, mainStyle } from './styles/main';
import { iconBtn } from './ui';
import { windowContentStyle, controlsStyle, windowStyle } from './styles/components';
import { graphView, scaleSlider } from './graph';
import { processView, entityView } from './entity';
import { treeView } from './tree';
import { iconButtonLightStyle } from './styles/ui';
import { GUI } from '../actions';
import { visibility } from '../graph/state/gui';
import { controlProps, entityWindowProps, graphWindowProps, treeWindowProps, controlTitleProps } from '../graph/state/views';
import { viewBox, graphData } from '../graph/state/graph';
import { entityViewProps } from '../graph/state/entity';
import { treeData } from '../graph/state/tree';
import { getDragDeltas } from '../../utils/component-helpers';
function titleView(_a, dispatch) {
    var title = _a.title;
    function move(delta) {
        dispatch(GUI.MAIN.MOVE_WINDOW, delta);
    }
    return ['h1', __assign({}, getDragDeltas(move)), title];
}
function resizeFooter(dispatch) {
    function resize(delta) {
        dispatch(GUI.MAIN.RESIZE_WINDOW, delta);
    }
    return ['footer', __assign({}, getDragDeltas(resize), { class: 'resize' })];
}
var activeButton = style({
    color: highlightColor
});
function setActiveWindow(label, dispatch) {
    return function () { return dispatch(GUI.MAIN.SET_ACTIVE_WINDOW, label); };
}
function controls(_a, dispatch, component) {
    var visibility = _a.visibility, position = _a.position;
    var click = function (label) {
        return function () { return dispatch(GUI.MAIN.UPDATE_VISIBILITY, label); };
    };
    var el = ['header', {
            class: classes('tvs-flow-controls', controlsStyle),
            onmousedown: setActiveWindow('controls', dispatch),
            style: __assign({}, position)
        },
        component(titleView, controlTitleProps),
        ['nav', { class: 'tvs-controls-btns' },
            ['ul',
                ['li',
                    iconBtn({
                        class: visibility.tree && activeButton,
                        onclick: click('tree'),
                        icon: icon.list(),
                        title: 'toggle entity tree'
                    })],
                ['li',
                    iconBtn({
                        class: visibility.graph && activeButton,
                        onclick: click('graph'),
                        icon: icon.graph(),
                        title: 'toggle flow graph'
                    })],
                ['li',
                    iconBtn({
                        class: visibility.entity && activeButton,
                        onclick: click('entity'),
                        icon: icon.entity(),
                        title: 'toggle entity details'
                    })]]]];
    return el;
}
function treeWindow(_a, dispatch, component) {
    var dimensions = _a.dimensions, window = _a.window;
    function move(delta) {
        dispatch(GUI.MAIN.MOVE_WINDOW, delta);
    }
    var el = ['article', {
            class: classes('tvs-flow-tree', windowStyle),
            style: __assign({}, dimensions),
            onmousedown: setActiveWindow('tree', dispatch)
        },
        ['header', __assign({}, getDragDeltas(move)), icon.list(window === 'tree' ? 'selected' : ''),
            ' Tree ',
            ['span', { class: 'gap' }],
            ' ',
            iconBtn({
                icon: icon.close(),
                class: iconButtonLightStyle,
                title: 'close window',
                onclick: function () { return dispatch(GUI.MAIN.CLOSE_WINDOW, 'tree'); }
            })],
        ['section', { class: windowContentStyle }, component(treeView, treeData)],
        resizeFooter(dispatch)];
    return el;
}
function graphWindow(_a, dispatch, component) {
    var dimensions = _a.dimensions, window = _a.window;
    var graph = component(graphView, graphData);
    function updateGraphSize(parent) {
        if (parent && parent.querySelector) {
            var graphNode_1 = parent.querySelector('section');
            requestAnimationFrame(function () {
                dispatch(GUI.GRAPH.UPDATE_SIZE, {
                    width: graphNode_1.clientWidth,
                    height: graphNode_1.clientHeight
                });
            });
        }
    }
    function move(delta) {
        dispatch(GUI.MAIN.MOVE_WINDOW, delta);
    }
    var el = ['article', {
            ref: updateGraphSize,
            class: classes('tvs-flow-graph', windowStyle),
            style: __assign({}, dimensions),
            onmousedown: setActiveWindow('graph', dispatch)
        },
        ['header', __assign({}, getDragDeltas(move)), icon.graph(window === 'graph' ? 'selected' : ''),
            ' Graph ',
            ['span', { class: 'gap' }],
            component(scaleSlider, viewBox),
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
                onclick: function () { return dispatch(GUI.MAIN.CLOSE_WINDOW, 'graph'); }
            })],
        graph,
        resizeFooter(dispatch)];
    return el;
}
function entityWindow(_a, dispatch, component) {
    var dimensions = _a.dimensions, node = _a.node, window = _a.window;
    var view = node && node.procedure
        ? processView(node, dispatch)
        : component(entityView, entityViewProps);
    function move(delta) {
        dispatch(GUI.MAIN.MOVE_WINDOW, delta);
    }
    var el = ['article', {
            class: classes('tvs-flow-entity', windowStyle),
            style: __assign({}, dimensions),
            onmousedown: setActiveWindow('entity', dispatch)
        },
        ['header', __assign({}, getDragDeltas(move)), icon.entity(window === 'entity' ? 'selected' : ''),
            ' ',
            node && node.id,
            ' ',
            ['span', { class: 'gap' }, ' '],
            ' ',
            iconBtn({
                icon: icon.close(),
                class: iconButtonLightStyle,
                title: 'close window',
                onclick: function () { return dispatch(GUI.MAIN.CLOSE_WINDOW, 'entity'); }
            })],
        view,
        resizeFooter(dispatch)];
    return el;
}
function root(visibility, _, component) {
    var tree = visibility.tree ? component(treeWindow, treeWindowProps) : '';
    var graph = visibility.graph ? component(graphWindow, graphWindowProps) : '';
    var entity = visibility.entity ? component(entityWindow, entityWindowProps) : '';
    var el = ['article', { class: classes('tvs-flow-tools', mainStyle) },
        component(controls, controlProps),
        graph,
        entity,
        tree
    ];
    return el;
}
export function mainView(component) {
    return component(root, visibility);
}
//# sourceMappingURL=main.js.map