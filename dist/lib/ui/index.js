import tvsFlow from 'tvs-flow/dist/lib';
import { getGraphFromModules } from "../utils/webpack";
import { mainView } from "./view/main";
import { flowComponentFactory } from "../utils/yoyo";
import { title as titleNode, visibility, graphWindow, entitiesWindow, treeWindow, controlsPosition } from "./graph/state/gui";
import { action, element as elementNode } from "./graph/events";
import { runtime as flowNode } from "./graph/state/flow";
import { nodeState, viewBox } from "./graph/state/graph";
var graphModules = require.context('./graph', true, /\.ts$/);
function saveAndRecover(title, entity, state) {
    var storageId = 'tvsFlowTools' + (title ? '::' + title : '') + '::' + entity.getId();
    var storedState = localStorage.getItem(storageId);
    if (storedState) {
        var value = JSON.parse(storedState);
        if (value.zIndex)
            value.zIndex = 0;
        state.set(entity.getId(), value);
    }
    state.on(entity.getId(), function (value) { return localStorage.setItem(storageId, JSON.stringify(value)); });
}
export function start(title, debug) {
    if (debug === void 0) { debug = false; }
    var state = tvsFlow.create();
    state.addGraph(getGraphFromModules(graphModules));
    if (title) {
        state.set(titleNode.getId(), title);
    }
    saveAndRecover(title, viewBox, state);
    saveAndRecover(title, nodeState, state);
    saveAndRecover(title, visibility, state);
    saveAndRecover(title, entitiesWindow, state);
    saveAndRecover(title, graphWindow, state);
    saveAndRecover(title, treeWindow, state);
    saveAndRecover(title, controlsPosition, state);
    var component = flowComponentFactory(state, action.getId(), debug);
    var element = mainView(component);
    document.body.appendChild(element);
    state.set(elementNode.getId(), element);
    function updateFlow(flow) {
        requestAnimationFrame(function () {
            state.set(flowNode.getId(), flow);
        });
    }
    function dispose() {
        document.body.removeChild(element);
    }
    return {
        updateFlow: updateFlow,
        dispose: dispose,
        getState: function () { return state; },
        getElement: function () { return element; }
    };
}
//# sourceMappingURL=index.js.map