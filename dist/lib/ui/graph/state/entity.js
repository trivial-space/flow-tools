"use strict";
import { val, stream, asyncStream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { unequal, defined, and } from 'tvs-libs/dist/lib/utils/predicates';
import { runtime, graph, metaEntity } from './flow';
import { visibility } from './gui';
export var activeEntityId = stream([metaEntity.HOT], function (entity) { return entity.activeEntityId; })
    .accept(and(defined, unequal));
export var activeProcessId = stream([metaEntity.HOT], function (entity) { return entity.activeProcessId; })
    .accept(and(defined, unequal));
export var activeEntity = stream([activeEntityId.HOT, graph.COLD], function (id, graph) { return graph.entities[id] || { id: id }; });
export var activeProcess = stream([activeProcessId.HOT, graph.COLD], function (id, graph) { return graph.processes[id] || { id: id }; });
export var activeNode = val({})
    .react([activeEntity.HOT], function (_, e) { return e; })
    .react([activeProcess.HOT], function (_, p) { return p; });
export var watchingEntity = stream([metaEntity.HOT], function (entity) { return entity.watchingEntity; })
    .accept(and(defined, unequal));
export var activeValue = asyncStream([runtime.COLD, activeEntityId.HOT, visibility.HOT, watchingEntity.HOT], function (send, flow, eid, visibility, watching) {
    if (eid) {
        var value = flow.get(eid);
        send(value);
        if (visibility.entity && watching) {
            flow.on(eid, send);
            return function () { return flow.off(eid, send); };
        }
    }
    else {
        send('');
    }
});
export var entityViewProps = stream([activeEntity.HOT, activeValue.HOT, watchingEntity.HOT], function (entity, value, watching) { return ({ entity: entity, value: value, watching: watching }); });
//# sourceMappingURL=entity.js.map