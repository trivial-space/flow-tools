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
import { action, windowSize } from '../events';
import { unequal } from 'tvs-libs/dist/lib/utils/predicates';
import { FLOW, GUI } from '../../actions';
import { guardMeta } from '../../types';
import { processEntities } from '../../../utils/entity-tree';
export var runtimes = val({})
    .react([action.HOT], function (self, action) {
    if (action.type === FLOW.SET_RUNTIME) {
        return __assign({}, self, (_a = {}, _a[action.payload.label] = action.payload.runtime, _a));
    }
    var _a;
});
export var selectedRuntimeId = val('')
    .react([runtimes.HOT], function (id, runtimes) { return id || Object.keys(runtimes)[0]; })
    .react([action.HOT], function (_, action) {
    if (action.type === FLOW.SELECT_ACTIVE_RUNTIME) {
        return action.payload;
    }
})
    .accept(unequal);
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
});
export var meta = stream([runtime.HOT], function (runtime) { return runtime.getMeta(); })
    .react([action.HOT, runtime.COLD], function (meta, _a, runtime) {
    var type = _a.type, payload = _a.payload;
    var flow = runtime;
    var ui = meta.ui;
    var graph = ui && ui.graph;
    var tree = ui && ui.tree;
    var entity = ui && ui.entity;
    var viewBox = graph && graph.viewBox;
    var activeWindow = ui && ui.activeWindow;
    switch (type) {
        case GUI.MAIN.SET_ACTIVE_WINDOW:
            return flow.setMeta({ ui: {
                    activeWindow: payload
                } });
        case GUI.MAIN.UPDATE_VISIBILITY:
            var currentVisibilityState = ui && ui[payload];
            var currentVisibilityValue = currentVisibilityState && currentVisibilityState.window && currentVisibilityState.window.visible;
            return flow.setMeta({ ui: (_b = {
                        activeWindow: payload
                    },
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
        case GUI.MAIN.MOVE_WINDOW:
            if (activeWindow) {
                var activeData = ui && ui[activeWindow];
                if (activeData && activeData.position) {
                    var top_1 = activeData.position.top - payload.y;
                    var left = activeData.position.left - payload.x;
                    return flow.setMeta(guardMeta({ ui: {
                            controls: {
                                position: { top: top_1, left: left }
                            }
                        } }));
                }
                else if (activeData) {
                    var position = activeData.window && activeData.window.area;
                    if (position) {
                        var top_2 = position.top - payload.y;
                        var left = position.left - payload.x;
                        return flow.setMeta(guardMeta({ ui: (_d = {},
                                _d[activeWindow] = {
                                    window: {
                                        area: { top: top_2, left: left }
                                    }
                                },
                                _d) }));
                    }
                }
            }
            break;
        case GUI.MAIN.RESIZE_WINDOW:
            var area = activeWindow && ui && ui[activeWindow] && ui[activeWindow].window && ui[activeWindow].window.area;
            if (area) {
                return flow.setMeta(guardMeta({ ui: (_e = {},
                        _e[activeWindow] = {
                            window: {
                                area: {
                                    width: area.width - payload.x,
                                    height: area.height - payload.y
                                }
                            }
                        },
                        _e) }));
            }
            break;
        case GUI.TREE.TOGGLE_LEVEL:
            var treeFold = tree && tree.fold || {};
            return flow.setMeta({ ui: {
                    tree: { fold: (_f = {},
                            _f[payload] = !treeFold[payload],
                            _f) }
                } });
        case GUI.ENTITY.SET_ACTIVE_ENTITY:
            return flow.setMeta({ ui: { entity: {
                        activeEntityId: payload,
                        activeProcessId: '',
                        watchingEntity: true
                    } } });
        case GUI.ENTITY.SET_ACTIVE_PROCESS:
            return flow.setMeta({ ui: { entity: {
                        activeProcessId: payload,
                        activeEntityId: '',
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
        case GUI.GRAPH.MOVE_ENTITY_POSITION:
            if (entity && entity.activeEntityId) {
                var e = meta.entities && meta.entities[entity.activeEntityId];
                var pos = e && e.ui && e.ui.graph && e.ui.graph.position || payload.start;
                var scale = graph && graph.viewBox && graph.viewBox.scale || 1;
                if (pos) {
                    return flow.setMeta({
                        entities: (_g = {},
                            _g[entity.activeEntityId] = {
                                ui: {
                                    graph: {
                                        position: {
                                            x: pos.x - payload.delta.x * scale,
                                            y: pos.y - payload.delta.y * scale
                                        }
                                    }
                                }
                            },
                            _g)
                    });
                }
            }
    }
    var _b, _c, _d, _e, _f, _g;
})
    .react([runtime.COLD, windowSize.HOT], function (self, runtime, _) { return runtime.setMeta(guardMeta(self)); });
export var metaGraph = stream([meta.HOT], function (meta) { return meta && meta.ui && meta.ui.graph; })
    .accept(unequal);
export var metaTree = stream([meta.HOT], function (meta) { return meta && meta.ui && meta.ui.tree; })
    .accept(unequal);
export var metaEntity = stream([meta.HOT], function (meta) { return meta && meta.ui && meta.ui.entity; })
    .accept(unequal);
export var metaEntities = stream([meta.HOT], function (meta) { return meta && meta.entities; })
    .accept(unequal);
export var metaControls = stream([meta.HOT], function (meta) { return meta && meta.ui && meta.ui.controls; })
    .accept(unequal);
export var graph = stream([runtime.HOT], function (flow) { return flow.getGraph(); });
export var enhancedEntityData = stream([graph.HOT], processEntities);
export var state = stream([runtime.HOT], function (flow) { return flow.getState(); });
//# sourceMappingURL=flow.js.map