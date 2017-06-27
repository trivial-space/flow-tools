import { val, stream, asyncStream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { unequal, defined, and } from 'tvs-libs/dist/lib/utils/predicates';
import { action, mouse } from '../events';
import { runtime, graph } from './flow';
import { GUI } from '../../actions';
import { visibility } from './gui';
export var activeEntity = val({})
    .react([action.HOT, graph.COLD], function (_, _a, graph) {
    var type = _a.type, payload = _a.payload;
    if (type === GUI.ENTITIES.OPEN_ENTITY) {
        return graph.entities[payload];
    }
})
    .react([mouse.HOT], function (_, mouse) {
    if (mouse.pressed[2] && mouse.pressed[2].target.closest('svg')) {
        return { id: '' };
    }
})
    .accept(defined);
export var activeProcess = val({})
    .react([action.HOT, graph.COLD], function (_, _a, graph) {
    var type = _a.type, payload = _a.payload;
    if (type === GUI.ENTITIES.OPEN_PROCESS) {
        return graph.processes[payload];
    }
})
    .react([mouse.HOT], function (_, mouse) {
    if (mouse.pressed[2] && mouse.pressed[2].target.closest('svg')) {
        return { id: '' };
    }
})
    .accept(defined);
export var activeNode = val({})
    .react([activeEntity.HOT], function (_, e) { return e; })
    .react([activeProcess.HOT], function (_, p) { return p; });
export var watchingEntity = val(true)
    .react([action.HOT], function (_, _a) {
    var type = _a.type, payload = _a.payload;
    if (type === GUI.ENTITIES.SET_EDIT_MODE) {
        return !payload;
    }
    else if (type === GUI.ENTITIES.SAVE_VALUE) {
        return true;
    }
})
    .react([activeEntity.HOT], function () { return true; })
    .accept(defined);
export var activeValue = asyncStream([runtime.COLD, activeEntity.HOT, visibility.HOT, watchingEntity.HOT], function (send, flow, entity, visibility, watching) {
    if (entity && entity.id) {
        var value = flow.get(entity.id);
        send(value != null ? value : '');
        if (visibility.entities && watching) {
            flow.on(entity.id, send);
            return function () { return flow.off(entity.id, send); };
        }
    }
    else {
        send('');
    }
});
export var editedValue = val('')
    .react([action.HOT, runtime.COLD], function (self, _a, flow) {
    var type = _a.type, payload = _a.payload;
    if (type === GUI.ENTITIES.UPDATE_EDITED_VALUE) {
        return payload;
    }
    else if (self && type === GUI.ENTITIES.SAVE_VALUE) {
        requestAnimationFrame(function () {
            try {
                flow.set(payload, JSON.parse(self));
            }
            catch (e) {
                console.error('could not save value to entity', payload, self);
                console.error(e);
            }
        });
    }
})
    .react([activeValue.HOT], function () { return ''; })
    .accept(and(defined, unequal));
export var entityValueView = stream([activeValue.HOT, watchingEntity.HOT], function (value, watching) { return ({ value: value, watching: watching }); }).val({ value: null, watching: true });
export var entityViewProps = stream([activeEntity.HOT, watchingEntity.HOT], function (entity, watching) { return ({ entity: entity, watching: watching }); });
//# sourceMappingURL=entity.js.map