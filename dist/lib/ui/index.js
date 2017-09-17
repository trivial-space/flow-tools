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
import { action, element as elementNode } from './graph/events';
import Clipboard from 'clipboard';
import Inferno from 'inferno';
import createElement from 'inferno-create-element';
import { FLOW } from './actions';
import { meta, selectedRuntimeId } from './graph/state/flow';
import { defaultUIMeta } from './types';
import * as debounce from 'lodash.debounce';
var graphModules = require.context('./graph', true, /\.ts$/);
function getLocalStorageId(label) {
    return 'tvsFlowTools' + '::' + label;
}
export function start(opts) {
    var options = __assign({ debug: false, graph: null }, opts);
    var state = tvsFlow.create();
    state.addGraph(getGraphFromModules(graphModules));
    state.flush();
    var component = flowComponentFactory(state, action.getId(), options.debug);
    var RootComponent = mainView(component);
    var element = document.createElement('div');
    element.className = 'tvs-flow-tools-container';
    document.body.appendChild(element);
    Inferno.render(createElement(RootComponent), element);
    state.set(elementNode.getId(), element);
    var clipboard = new Clipboard('.tvs-save-graph', {
        text: function () { return JSON.stringify(state.get(meta.getId()), null, '  '); }
    });
    clipboard.on('success', function (e) { return console.log('saved graph to clipboard', e); });
    clipboard.on('error', function (e) { return console.log('error while saving graph to clipboard', e); });
    state.on(meta.getId(), debounce(function (value) {
        var label = state.get(selectedRuntimeId.getId());
        if (label) {
            localStorage.setItem(getLocalStorageId(label), JSON.stringify(value));
        }
    }, 300));
    function setFlow(runtime, label) {
        var oldMeta = runtime.getMeta();
        var localValue = localStorage.getItem(getLocalStorageId(label));
        runtime.setMeta(__assign({}, defaultUIMeta, { name: label }));
        if (localValue) {
            var value = JSON.parse(localValue);
            runtime.setMeta(value);
        }
        runtime.setMeta(oldMeta);
        requestAnimationFrame(function () {
            state.set(action.getId(), {
                type: FLOW.SET_RUNTIME,
                payload: { label: label, runtime: runtime }
            });
        });
    }
    function dispose() {
        document.body.removeChild(element);
        clipboard.destroy();
    }
    return {
        setFlow: setFlow,
        dispose: dispose,
        getState: function () { return state; },
        getElement: function () { return element; }
    };
}
//# sourceMappingURL=index.js.map