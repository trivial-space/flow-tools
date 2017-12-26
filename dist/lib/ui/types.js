import { clamp } from 'tvs-libs/dist/lib/math/core';
export var graphDefaultViewBox = {
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    scale: 1
};
export var EntityViewMode;
(function (EntityViewMode) {
    EntityViewMode["DETAILS"] = "details";
    EntityViewMode["VALUE"] = "value";
})(EntityViewMode || (EntityViewMode = {}));
export var defaultUIMeta = {
    ui: {
        entity: {
            activeEntityId: '',
            activeProcessId: '',
            watchingEntity: false,
            window: {
                visible: false,
                area: {
                    top: 50,
                    left: 400,
                    width: 400,
                    height: 500
                }
            }
        },
        graph: {
            viewBox: {
                width: 600,
                height: 600,
                offsetX: 0,
                offsetY: 0,
                scale: 1
            },
            window: {
                visible: false,
                area: {
                    top: 200,
                    left: 100,
                    width: 600,
                    height: 600
                }
            }
        },
        tree: {
            window: {
                visible: false,
                area: {
                    top: 100,
                    left: 0,
                    width: 300,
                    height: 400
                }
            }
        },
        controls: {
            position: {
                top: 0,
                left: 0
            }
        }
    },
    entities: {}
};
var topGuard = function (val) { return clamp(0, window.innerHeight - 20, val); };
var leftGuard = function (val) { return clamp(0, window.innerWidth - 20, val); };
var widthGuard = function (val) { return Math.min(window.innerWidth - 20, val); };
var heightGuard = function (val) { return Math.min(window.innerHeight - 20, val); };
export var metaGuards = {
    ui: {
        entity: {
            window: {
                area: {
                    top: topGuard,
                    left: leftGuard,
                    width: widthGuard,
                    height: heightGuard
                }
            }
        },
        graph: {
            window: {
                area: {
                    top: topGuard,
                    left: leftGuard,
                    width: widthGuard,
                    height: heightGuard
                }
            }
        },
        tree: {
            window: {
                area: {
                    top: topGuard,
                    left: leftGuard,
                    width: widthGuard,
                    height: heightGuard
                }
            }
        },
        controls: {
            position: {
                top: topGuard,
                left: leftGuard
            }
        }
    }
};
export function applyGuard(data, guard) {
    for (var key in data) {
        if (typeof guard[key] === 'function') {
            data[key] = guard[key](data[key]);
        }
        else if (data[key]
            && typeof data[key] === 'object'
            && guard[key]
            && typeof guard[key] === 'object') {
            applyGuard(data[key], guard[key]);
        }
    }
    return data;
}
export function guardMeta(data) {
    return applyGuard(data, metaGuards);
}
//# sourceMappingURL=types.js.map