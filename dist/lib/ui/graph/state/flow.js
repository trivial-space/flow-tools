"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { val, stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { action } from '../events';
import { defined, unequal, and } from 'tvs-libs/dist/lib/utils/predicates';
import { FLOW, GUI } from '../../actions';
export var runtimes = val({})
    .react([action.HOT], function (self, action) {
    if (action.type === FLOW.SET_RUNTIME) {
        return __assign({}, self, (_a = {}, _a[action.payload.label] = action.payload.runtime, _a));
    }
    var _a;
})
    .accept(defined);
export var selectedRuntimeId = val('')
    .react([runtimes.HOT], function (id, runtimes) { return id || Object.keys(runtimes)[0]; })
    .react([action.HOT], function (_, action) {
    if (action.type === FLOW.SELECT_ACTIVE_RUNTIME) {
        return action.payload;
    }
})
    .accept(and(defined, unequal));
export var runtime = stream([runtimes.COLD, selectedRuntimeId.HOT], function (runtimes, id) { return runtimes[id]; })
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
export var meta = stream([runtime.HOT], function (runtime) { return runtime.getMeta(); })
    .react([action.HOT, runtime.COLD], function (meta, _a, runtime) {
    var type = _a.type, payload = _a.payload;
    var flow = runtime;
    var graph = meta.ui && meta.ui.graph;
    var tree = meta.ui && meta.ui.tree;
    var entity = meta.ui && meta.ui.entity;
    var viewBox = graph && graph.viewBox;
    switch (type) {
        case GUI.MAIN.UPDATE_VISIBILITY:
            var currentVisibilityState = meta.ui && meta.ui[payload];
            var currentVisibilityValue = currentVisibilityState && currentVisibilityState.window && currentVisibilityState.window.visible;
            return flow.setMeta({ ui: (_b = {},
                    _b[payload] = {
                        window: {
                            visible: !currentVisibilityValue
                        }
                    },
                    _b) });
        case GUI.MAIN.CLOSE_WINDOW:
            return flow.setMeta({ ui: (_c = {},
                    _c[payload] = {
                        window: {
                            visible: false
                        }
                    },
                    _c) });
        case GUI.TREE.TOGGLE_LEVEL:
            var treeFold = tree && tree.fold || {};
            return flow.setMeta({ ui: {
                    tree: { fold: (_d = {},
                            _d[payload] = !treeFold[payload],
                            _d) }
                } });
        case GUI.ENTITY.SET_ACTIVE_ENTITY:
            return flow.setMeta({ ui: { entity: {
                        activeEntityId: payload,
                        watchingEntity: true
                    } } });
        case GUI.ENTITY.SET_ACTIVE_PROCESS:
            return flow.setMeta({ ui: { entity: {
                        activeProcessId: payload,
                        watchingEntity: false
                    } } });
        case GUI.ENTITY.RESET_ACTIVE_NODE:
            return flow.setMeta({ ui: { entity: {
                        activeEntityId: '',
                        activeProcessId: '',
                        watchingEntity: false
                    } } });
        case GUI.ENTITY.SAVE_VALUE:
            var currentEntityId = entity && entity.activeEntityId;
            if (currentEntityId) {
                flow.set(currentEntityId, payload);
            }
            return flow.setMeta({ ui: { entity: {
                        watchingEntity: true
                    } } });
        case GUI.ENTITY.WATCH_ACTIVE_ENTITY:
            return flow.setMeta({ ui: { entity: {
                        watchingEntity: payload
                    } } });
        case GUI.GRAPH.MOVE_VIEWPORT:
            return flow.setMeta({ ui: { graph: {
                        viewBox: {
                            offsetX: (viewBox && viewBox.offsetX || 0) + payload.x,
                            offsetY: (viewBox && viewBox.offsetY || 0) + payload.y
                        }
                    } } });
        case GUI.GRAPH.UPDATE_SCALE:
            return flow.setMeta({ ui: { graph: {
                        viewBox: {
                            scale: payload
                        }
                    } } });
        case GUI.GRAPH.UPDATE_SIZE:
            if (payload.width && payload.height) {
                return flow.setMeta({ ui: { graph: {
                            viewBox: {
                                width: payload.width,
                                height: payload.height
                            }
                        } } });
            }
            return;
        case GUI.GRAPH.SET_ENTITY_POSITION:
            return flow.setMeta({
                entities: (_e = {},
                    _e[payload.eid] = {
                        ui: {
                            graph: {
                                position: payload.pos
                            }
                        }
                    },
                    _e)
            });
    }
    var _b, _c, _d, _e;
})
    .accept(defined);
export var metaGraph = stream([meta.HOT], function (meta) { return meta && meta.ui && meta.ui.graph; })
    .accept(unequal);
export var metaTree = stream([meta.HOT], function (meta) { return meta && meta.ui && meta.ui.tree; })
    .accept(unequal);
export var metaEntity = stream([meta.HOT], function (meta) { return meta && meta.ui && meta.ui.entity; })
    .accept(unequal);
export var metaEntities = stream([meta.HOT], function (meta) { return meta && meta.entities; })
    .accept(unequal);
export var graph = stream([runtime.HOT], function (flow) { return flow.getGraph(); });
export var state = stream([runtime.HOT], function (flow) { return flow.getState(); });
//# sourceMappingURL=flow.js.map