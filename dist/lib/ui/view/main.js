var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { style, classes } from "typestyle";
import * as css from 'dom-css';
import { h } from '../../utils/yoyo';
import * as icon from "./icons";
import { highlightColor, mainStyle } from "./styles/main";
import { iconBtn } from "./ui";
import { radioBtnStyle } from "./styles/ui";
import { windowContentStyle, controlsStyle, windowStyle } from "./styles/components";
import { graphView, scaleSlider } from "./graph";
import { processView, entityView } from "./entities";
import { treeView, listView } from "./tree";
function title(title) {
    return h(['h1', title]);
}
var activeButton = style({
    color: highlightColor
});
function setActiveWindow(label, dispatch) {
    return function () { return dispatch('state.gui.setActiveWindow', label); };
}
function controls(_a, dispatch, component, root) {
    var visibility = _a.visibility, position = _a.position;
    var click = function (label) {
        return function () { return dispatch('state.gui.updateVisibility', label); };
    };
    var el = h(['header', {
            class: classes('tvs-flow-controls', controlsStyle),
            onmousedown: setActiveWindow('controls', dispatch)
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
                    })]]]]);
    css(root || el, position);
    return el;
}
function treeWindow(_a, dispatch, component, root) {
    var props = _a.props, dimensions = _a.dimensions;
    var comp = props.treeViewComponent === 'tree' ?
        component(treeView, 'state.gui.treeData') :
        component(listView, 'state.flow.state');
    function changeView(viewName) {
        return function () {
            dispatch('state.gui.setTreeView', viewName);
        };
    }
    var el = h(['article', {
            'data-key': 'tree',
            class: classes('tvs-flow-tree', windowStyle),
            onmousedown: setActiveWindow('tree', dispatch)
        },
        ['header',
            icon.list(),
            ['label', { class: radioBtnStyle },
                ['input', {
                        type: 'radio',
                        name: 'viewTreeComponent',
                        value: 'tree',
                        onchange: changeView('tree'),
                        checked: props.treeViewComponent === 'tree'
                    }],
                'Tree'],
            ['label', { class: radioBtnStyle },
                ['input', {
                        type: 'radio',
                        name: 'viewTreeComponent',
                        value: 'list',
                        onchange: changeView('list'),
                        checked: props.treeViewComponent !== 'tree'
                    }],
                'List']],
        ['section', { class: windowContentStyle }, comp],
        ['footer', {
                class: 'resize',
                'data-key': 'resize'
            }]]);
    css(root || el, dimensions);
    return el;
}
function graphWindow(graphStyle, dispatch, component, root) {
    var graph = component(graphView, 'state.graph.viewData');
    var el = root || h(['article', {
            'data-key': 'graph',
            class: classes('tvs-flow-graph', windowStyle),
            onmousedown: setActiveWindow('graph', dispatch)
        },
        ['header',
            icon.graph(),
            ' Graph ',
            component(scaleSlider, 'state.graph.viewBox')],
        graph,
        ['footer', { class: 'resize' }]]);
    css(el, __assign({}, graphStyle));
    requestAnimationFrame(function () {
        dispatch('updateGraphSize', {
            width: graph.clientWidth,
            height: graph.clientHeight
        });
    });
    return el;
}
function entitiesWindow(_a, dispatch, component, root) {
    var dimensions = _a.dimensions, node = _a.node;
    var view = node.procedure
        ? processView(node, dispatch)
        : component(entityView, 'state.gui.entityViewProps');
    var el = h(['article', {
            'data-key': 'entities',
            class: classes('tvs-flow-entities', windowStyle),
            onmousedown: setActiveWindow('entities', dispatch)
        },
        ['header',
            icon.entities(), ' ',
            node.id],
        view,
        ['footer', {
                class: 'resize',
                'data-key': 'resize'
            }]]);
    css(root || el, __assign({}, dimensions));
    return el;
}
function root(visibility, _, component) {
    var tree = visibility.tree ? component(treeWindow, 'state.gui.treeWindowProps') : '';
    var graph = visibility.graph ? component(graphWindow, 'state.gui.graphWindow') : '';
    var entities = visibility.entities ? component(entitiesWindow, 'state.gui.entitiesWindowProps') : '';
    var el = h(['article', { class: classes('tvs-flow-tools', mainStyle) },
        component(controls, 'state.gui.controlProps'),
        graph,
        entities,
        tree
    ]);
    return el;
}
export function mainView(component) {
    return component(root, 'state.gui.visibility');
}
//# sourceMappingURL=main.js.map