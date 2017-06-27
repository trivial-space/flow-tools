import { val, stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { createEntityTree } from '../../../utils/entity-tree';
import { action } from '../events';
import { defined } from 'tvs-libs/dist/lib/utils/predicates';
import { FLOW } from '../../actions';
export var runtime = val()
    .react([action.HOT], function (self, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case FLOW.PROCESS_RUN:
            self.start(payload);
            return;
        case FLOW.PROCESS_STOP:
            self.stop(payload);
            return;
        case FLOW.ENTITY_RESET:
            self.set(payload, self.getGraph().entities[payload].value);
            return;
        case FLOW.ENTITY_INSPECT:
            console.log(payload, self.get(payload));
            return;
    }
})
    .accept(defined);
export var graph = stream([runtime.HOT], function (flow) { return flow.getGraph(); });
export var state = stream([runtime.HOT], function (flow) { return flow.getState(); });
export var entityTree = stream([graph.HOT], function (graph) { return createEntityTree(graph.entities); });
//# sourceMappingURL=flow.js.map