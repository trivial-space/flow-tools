import { val, stream, asyncStream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { unequal } from 'tvs-libs/dist/lib/utils/predicates';
import { runtime, metaEntity, enhancedGraphData } from './flow';
import { visibility } from './gui';
export var activeEntityId = stream([metaEntity.HOT], function (entity) { return entity.activeEntityId; })
    .accept(unequal);
export var activeProcessId = stream([metaEntity.HOT], function (entity) { return entity.activeProcessId; })
    .accept(unequal);
export var activeEntity = stream([activeEntityId.HOT, enhancedGraphData.COLD], function (id, graph) { return graph.entities[id] || { id: id }; });
export var activeProcess = stream([activeProcessId.HOT, enhancedGraphData.COLD], function (id, graph) { return graph.processes[id] || { id: id }; });
export var activeNode = val({ id: '' })
    .react([activeProcess.HOT, activeEntity.HOT], function (_, p, e) { return p.id ? p : e; });
export var watchingEntity = stream([metaEntity.HOT], function (entity) { return entity.watchingEntity; })
    .accept(unequal);
export var activeValue = asyncStream([runtime.COLD, activeEntityId.HOT, visibility.HOT, watchingEntity.HOT], function (send, flow, eid, visibility, watching) {
    if (eid) {
        var value = flow.get(eid);
        send(value === undefined ? null : value);
        if (visibility.entity && watching) {
            flow.on(eid, send);
            return function () { return flow.off(eid, send); };
        }
    }
    else {
        send(null);
    }
});
//# sourceMappingURL=entity.js.map