import tvsFlow from 'tvs-flow/dist/lib';
import { getGraphFromModules } from "../utils/webpack";
import { mainView } from "./view/main";
import { flowComponentFactory } from "../utils/yoyo";
import { title as titleNode } from "./graph/state/gui";
import { action, element as elementNode } from "./graph/events";
import { runtime as flowNode } from "./graph/state/flow";
import { nodeState } from "./graph/state/graph";
var graphModules = require.context('./graph', true, /\.ts$/);
export function start(title) {
    if (title === void 0) { title = 'tvs-flow tools'; }
    var state = tvsFlow.create();
    state.addGraph(getGraphFromModules(graphModules));
    state.set(titleNode.getId(), title);
    var graphUIState = localStorage.getItem(title);
    if (graphUIState) {
        state.set(nodeState.getId(), JSON.parse(graphUIState));
    }
    var component = flowComponentFactory(state, action.getId());
    var element = mainView(component);
    document.body.appendChild(element);
    state.set(elementNode.getId(), element);
    function updateFlow(flow) {
        state.set(flowNode.getId(), flow);
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