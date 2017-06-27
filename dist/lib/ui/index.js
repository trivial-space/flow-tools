"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import tvsFlow from 'tvs-flow/dist/lib';
import { getGraphFromModules } from '../utils/webpack';
import { mainView } from './view/main';
import { flowComponentFactory } from '../utils/inferno';
import { title as titleNode, visibility, graphWindow, entitiesWindow, treeWindow, controlsPosition } from './graph/state/gui';
import { action, element as elementNode } from './graph/events';
import { runtime as flowNode } from './graph/state/flow';
import { nodeState, viewBox } from './graph/state/graph';
import Clipboard from 'clipboard';
import Inferno from 'inferno';
import createElement from 'inferno-create-element';
var graphModules = require.context('./graph', true, /\.ts$/);
function saveAndRecover(title, entity, state) {
    var id = entity.getId();
    var storageId = 'tvsFlowTools' + (title ? '::' + title : '') + '::' + id;
    var storedState = localStorage.getItem(storageId);
    if (storedState) {
        var value = JSON.parse(storedState);
        if (value.zIndex)
            value.zIndex = 0;
        state.set(id, __assign({}, state.get(id), value));
    }
    state.on(entity.getId(), function (value) { return localStorage.setItem(storageId, JSON.stringify(value)); });
}
export function start(title, opts) {
    var options = __assign({ debug: false, graph: null }, opts);
    var state = tvsFlow.create();
    state.addGraph(getGraphFromModules(graphModules));
    state.flush();
    if (title) {
        state.set(titleNode.getId(), title);
    }
    if (options.graph) {
        state.set(nodeState.getId(), options.graph);
    }
    saveAndRecover(title, viewBox, state);
    saveAndRecover(title, nodeState, state);
    saveAndRecover(title, visibility, state);
    saveAndRecover(title, entitiesWindow, state);
    saveAndRecover(title, graphWindow, state);
    saveAndRecover(title, treeWindow, state);
    saveAndRecover(title, controlsPosition, state);
    var component = flowComponentFactory(state, action.getId(), options.debug);
    var RootComponent = mainView(component);
    var element = document.createElement('div');
    element.className = 'tvs-flow-tools-container';
    document.body.appendChild(element);
    Inferno.render(createElement(RootComponent), element);
    state.set(elementNode.getId(), element);
    var clipboard = new Clipboard('.tvs-save-graph', {
        text: function () { return JSON.stringify(state.get(nodeState.getId()), null, '  '); }
    });
    clipboard.on('success', function (e) { return console.log('saved graph to clipboard', e); });
    clipboard.on('error', function (e) { return console.log('error while saving graph to clipboard', e); });
    function updateFlow(flow) {
        requestAnimationFrame(function () {
            state.set(flowNode.getId(), flow);
        });
    }
    function dispose() {
        document.body.removeChild(element);
        clipboard.destroy();
    }
    return {
        updateFlow: updateFlow,
        dispose: dispose,
        getState: function () { return state; },
        getElement: function () { return element; }
    };
}
//# sourceMappingURL=index.js.map