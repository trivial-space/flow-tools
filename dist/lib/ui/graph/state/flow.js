import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { createEntityTree } from "utils/entity-tree";
export var runtime = val();
export var graph = stream([runtime.HOT], function (flow) { return flow.getGraph(); });
export var state = stream([runtime.HOT], function (flow) { return flow.getState(); });
export var entityTree = stream([graph.HOT], function (graph) { return createEntityTree(graph.entities); });
//# sourceMappingURL=flow.js.map